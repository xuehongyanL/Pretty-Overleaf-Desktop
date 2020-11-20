import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import path from 'path';
import * as Utils from '../utils/utils';
import { isDarwinPlatform, lookup } from '../utils/utils';
import * as CSS from './css';
import MakePDFWindow from './pdf';

let pdfView: BrowserWindow | null = null;

export default () => {
    const winProps = Utils.getWindow();

    const mw = new BrowserWindow({
        title: 'Pretty Overleaf Desktop',
        width: winProps.width,
        height: winProps.height,
        x: winProps.x,
        y: winProps.y,
        frame: !isDarwinPlatform(),
        titleBarStyle: isDarwinPlatform() ? 'hidden' : 'default',
        transparent: isDarwinPlatform(),
        icon: path.resolve(`${path.dirname(require.main!.filename)}/../assets/icons/png/overleaf.png`),
        show: !isDarwinPlatform(),
        webPreferences: {
            nodeIntegration: false,
            nativeWindowOpen: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload')
        }
    });

    if (Utils.shouldMenuAutoHide()) {
        mw.setAutoHideMenuBar(true);
        mw.setMenuBarVisibility(false);
    }

    lookup('v2.overleaf.com').then((connected) => {
        if (!connected) {
            const btnClicked = dialog.showMessageBoxSync(mw, {
                title: 'Detected No Internet Connection',
                message: `
                    Overleaf Desktop requires the internet to run.
                    Since you are not connected to the internet, this
                    application is not able to connect to Overleaf (or
                    its servers). Sorry!
                `,
                type: 'error',
                icon: path.resolve(`${path.dirname(require.main!.filename)}/../assets/icons/png/overleaf.png`),
                buttons: ['Continue', 'Quit']
            });

            if (btnClicked === 1) {
                app.quit();
            }
        }
    });

    mw.loadURL('https://v2.overleaf.com/');

    mw.webContents.on('dom-ready', () => {
        CSS.inject(mw);
    });

    mw.webContents.on('new-window', async (evt, url, _) => {
        evt.preventDefault();

        if (url.includes('overleaf.com')) {
            if (url.includes('pdf')) {
                url = `${url.substr(0, url.indexOf('output.pdf?'))}output.pdf`;
                pdfView = await MakePDFWindow(url, mw, pdfView);
            } else {
                mw.loadURL(url);
                CSS.inject(mw);
                mw.webContents.session.flushStorageData();
            }
        } else {
            shell.openExternal(url);
        }
    });

    mw.webContents.on('will-navigate', async (evt, url) => {
        if (!url.includes('overleaf.com')) {
            evt.preventDefault();
            shell.openExternal(url);
        }
    });

    ipcMain.on('send-to-main', (event, args) => {
        console.log(args);
    });

    mw.on('close', () => {
        mw.webContents.session.flushStorageData();
        pdfView?.destroy();
    });

    mw.on('move', () => {
        const bds = mw.getBounds();
        Utils.setWindow(bds.x, bds.y, bds.width, bds.height);
    });

    mw.on('resize', () => {
        const bds = mw.getBounds();
        Utils.setWindow(bds.x, bds.y, bds.width, bds.height);
    });

    mw.once('ready-to-show', () => {
        mw.show();
        mw.focus();
    });

    return mw;
}; 