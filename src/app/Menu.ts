import { BrowserWindow, KeyboardEvent, MenuItem, MenuItemConstructorOptions, shell } from 'electron';
import { isDarwinPlatform } from '../utils/utils';
import { store } from '../utils/utils';
import { AccountSettingsAction } from '../action/AccountSettingsAction';
import { SubscriptionAction } from '../action/SubscriptionAction';
import { LogOutAction } from '../action/LogOutAction';
import { ContactUsAction } from '../action/ContactUsAction';
import { ToggleNavBarAction } from '../action/ToggleNavBarAction';
import { ToggleFooterAction } from '../action/ToggleFooterAction';

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

const getAccountMenu: (window: any) => MenuItemConstructorOptions = (window) => ({
    label: 'Account',
    submenu: [{
        label: 'Account Settings',
        click: async () => {
            await window.webContents.send('send-to-renderer', new AccountSettingsAction());
        }
    }, {
        label: 'Subscription',
        click: async () => {
            await window.webContents.send('send-to-renderer', new SubscriptionAction());
        }
    }, {
        type: 'separator'
    }, {
        label: 'Log Out',
        click: async () => {
            await window.webContents.send('send-to-renderer', new LogOutAction());
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

const getViewMenu: (window: any) => MenuItemConstructorOptions = (window) => ({
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
        }
    }, {
        type: 'separator'
    }, {
        label: 'Toggle Navigation',
        click: async () => {
            await window.webContents.send('send-to-renderer', new ToggleNavBarAction());
        }
    }, {
        label: 'Toggle Footer',
        click: async () => {
            await window.webContents.send('send-to-renderer', new ToggleFooterAction());
        }
    }, {
        type: 'separator'
    }, {
        role: 'togglefullscreen'
    }]
});

const getMacOSViewMenu: (window: any) => MenuItemConstructorOptions = (window) => ({
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
        label: 'Toggle Navigation',
        click: async () => {
            await window.webContents.send('send-to-renderer', new ToggleNavBarAction());
        }
    }, {
        label: 'Toggle Footer',
        click: async () => {
            await window.webContents.send('send-to-renderer', new ToggleFooterAction());
        }
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

const getAboutMenu: (window: any) => MenuItemConstructorOptions = (window) => ({
    label: 'About',
    submenu: [{
        label: 'Documentation',
        click: async () => {
            await shell.openExternal('https://www.overleaf.com/learn');
        }
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
        label: 'Contact Us (In Page)',
        click: async () => {
            await window.webContents.send('send-to-renderer', new ContactUsAction());
        }
    }, {
        label: 'Contact Us (External)',
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
    }, {
        type: 'separator'
    }, {
        label: '© 2020 Overleaf'
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
        getAccountMenu(window),
        getEditMenu(),
        getViewMenu(window),
        getGoMenu(),
        getAboutMenu(window)
    ];
    return tmpl;
};

const macOsMenu = (window: any) => {
    const tmpl: Array<MenuItemConstructorOptions> = [
        getMacOSFirstMenu(),
        getProjectMenu(window),
        getAccountMenu(window),
        getEditMenu(),
        getMacOSViewMenu(window),
        getGoMenu(),
        getMacOSWindowMenu(),
        getAboutMenu(window)
    ];
    return tmpl;
};

export const getMenu = (window: any) => {
    return isDarwinPlatform() ? macOsMenu(window) : menu(window);
};