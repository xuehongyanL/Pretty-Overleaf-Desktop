import { BrowserWindow, KeyboardEvent, MenuItem, MenuItemConstructorOptions, shell } from 'electron';
import { isDarwinPlatform } from '../utils/utils';
import { store } from '../utils/utils';

const menu = () => {
    const tmpl: Array<MenuItemConstructorOptions> = [{
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
    }, {
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
            role: 'togglefullscreen'
        }]
    }, {
        label: 'Go',
        submenu: [{
            role: 'reload'
        }, {
            role: 'forceReload'
        }]
    }, {
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
    }];

    return tmpl;
};

const macOsMenu = () => {
    const tmpl: Array<MenuItemConstructorOptions> = [{
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
    }, {
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
    }, {
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
    }, {
        label: 'Go',
        submenu: [{
            role: 'reload'
        }, {
            role: 'forceReload'
        }]
    }, {
        label: 'Window',
        submenu: [{
            role: 'minimize'
        }, {
            role: 'close'
        }, {
            type: 'separator'
        }]
    }, {
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
    }];

    return tmpl;
};

export const getMenu = () => {
    return isDarwinPlatform() ? macOsMenu() : menu();
};