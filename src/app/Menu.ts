import { BrowserWindow, KeyboardEvent, MenuItem, MenuItemConstructorOptions, shell } from 'electron';
import { isDarwinPlatform } from '../utils/utils';
import { store } from '../utils/utils';

const getMacOSFirstMenu: () => MenuItemConstructorOptions = () => ({
    label: 'Gmail Desktop',
    submenu: [{
        label: 'About Overleaf Desktop',
        role: 'about'
    }, {
        type: 'separator'
    }, {
        role: 'hide'
    }, {
        role: 'hideOthers'
    }, {
        role: 'unhide'
    }, {
        type: 'separator'
    }, {
        role: 'quit'
    }]
});

const getProjectMenu: (window: any) => MenuItemConstructorOptions = (window) => ({
    label: 'Project',
    submenu: [{
        label: 'Projects',
        click: async () => {
            await window.loadURL('https://www.overleaf.com/project');
        }
    }]
});

const getEditMenu: () => MenuItemConstructorOptions = () => ({
    label: 'Edit',
    submenu: [{
        role: 'undo'
    }, {
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        role: 'cut'
    }, {
        role: 'copy'
    }, {
        role: 'paste'
    }, {
        role: 'pasteAndMatchStyle'
    }, {
        role: 'delete'
    }, {
        role: 'selectAll'
    }]
});

const getViewMenu: () => MenuItemConstructorOptions = () => ({
    label: 'View',
    submenu: [{
        role: 'toggleDevTools'
    }, {
        type: 'separator'
    }, {
        role: 'resetZoom'
    }, {
        role: 'zoomIn'
    }, {
        role: 'zoomOut'
    }, {
        type: 'separator'
    }, {
        type: 'checkbox',
        label: 'Auto Hide Menubar',
        checked: store.get('autoHideMenu'),
        click: (menuItem: MenuItem, bw: BrowserWindow | undefined, evt: KeyboardEvent) => {
            const newHide = !store.get('autoHideMenu');
            if (newHide) {
                bw?.setAutoHideMenuBar(true);
            } else {
                bw?.setAutoHideMenuBar(false);
                bw?.setMenuBarVisibility(true);
            }
            store.set('autoHideMenu', newHide);
            menuItem.checked = newHide;
        } }, {
        role: 'togglefullscreen'
    }]
});

const getMacOSViewMenu: () => MenuItemConstructorOptions = () => ({
    label: 'View',
    submenu: [{
        role: 'toggleDevTools'
    }, {
        type: 'separator'
    }, {
        role: 'resetZoom'
    }, {
        role: 'zoomIn'
    }, {
        role: 'zoomOut'
    }, {
        type: 'separator'
    }, {
        role: 'togglefullscreen'
    }]
});

const getGoMenu: () => MenuItemConstructorOptions = () => ({
    label: 'Go',
    submenu: [{
        role: 'reload'
    }, {
        role: 'forceReload'
    }]
});

const getHelpMenu: (window: any) => MenuItemConstructorOptions = (window) => ({
    label: 'Help',
    submenu: [{
        label: 'Documentation',
        click: async () => {
            await shell.openExternal('https://www.overleaf.com/learn');
        }
    }, {
        label: 'Contact Us',
        click: async () => {
            await window.webContents.send('send-to-renderer', 'ContactUs', null);
        }
    }]
});

const getAboutMenu: () => MenuItemConstructorOptions = () => ({
    label: 'About',
    submenu: [{
        label: '© 2020 Overleaf'
    }, {
        type: 'separator'
    }, {
        label: 'Privacy and Terms',
        click: async () => {
            await shell.openExternal('https://www.overleaf.com/legal');
        }
    }, {
        label: 'Security',
        click: async () => {
            await shell.openExternal('https://www.overleaf.com/legal#Security');
        }
    }, {
        label: 'Contact Us',
        click: async () => {
            await shell.openExternal('https://www.overleaf.com/contact');
        }
    }, {
        label: 'About',
        click: async () => {
            await shell.openExternal('https://www.overleaf.com/about');
        }
    }, {
        label: 'Blog',
        click: async () => {
            await shell.openExternal('https://www.overleaf.com/blog');
        }
    }]
});

const getMacOSWindowMenu: () => MenuItemConstructorOptions = () => ({
    label: 'Window',
    submenu: [{
        role: 'minimize'
    }, {
        role: 'close'
    }, {
        type: 'separator'
    }]
});

const menu = (window: any) => {
    const tmpl: Array<MenuItemConstructorOptions> = [
        getProjectMenu(window),
        getEditMenu(),
        getViewMenu(),
        getGoMenu(),
        getHelpMenu(window),
        getAboutMenu()
    ];
    return tmpl;
};

const macOsMenu = (window: any) => {
    const tmpl: Array<MenuItemConstructorOptions> = [
        getMacOSFirstMenu(),
        getProjectMenu(window),
        getEditMenu(),
        getMacOSViewMenu(),
        getGoMenu(),
        getMacOSWindowMenu(),
        getHelpMenu(window),
        getAboutMenu()
    ];
    return tmpl;
};

export const getMenu = (window: any) => {
    return isDarwinPlatform() ? macOsMenu(window) : menu(window);
};