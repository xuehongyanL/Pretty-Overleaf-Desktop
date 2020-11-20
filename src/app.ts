import electron, { app, BrowserWindow, Menu } from 'electron'
import contextMenu from 'electron-context-menu'
import fs from 'fs'
import path from 'path'
import MakeWindow from './app/mw'
import {getMenu} from './app/Menu'
import {isDarwinPlatform} from './utils/utils'

let window: BrowserWindow | null = null

const initEvents = () => {
    app.on('window-all-closed', () => {
        window?.webContents.session.flushStorageData()
        window = null
        if (!isDarwinPlatform()) {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (!window) {
            window = MakeWindow()
            Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu()))
        }
    })

    app.on('ready', () => {
        if (app.isPackaged) {
            contextMenu({
                showSaveImage: false,
                showSaveImageAs: false,
                showCopyImage: false,
                showCopyImageAddress: false
            })
        } else {
            contextMenu({
                showInspectElement: true
            })
        }

        window = MakeWindow()
        Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu()))
    })

    app.on('quit', () => {
        const downloadDir = path.join((electron.app || electron.remote.app).getPath('userData'), '/download/')
        const filepath = path.join(downloadDir, '/tmp.pdf')

        if (fs.existsSync(downloadDir)) {
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath)
            }
            fs.rmdirSync(downloadDir)
        }
    })
}

initEvents()