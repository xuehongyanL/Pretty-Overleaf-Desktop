import { BrowserWindow, KeyboardEvent, MenuItem, MenuItemConstructorOptions, shell } from 'electron';
import { isDarwinPlatform } from '../utils/utils';
import { store } from '../utils/utils';

const menu = (window: any) => {
    const tmpl: Array<MenuItemConstructorOptions> = [{
        label: 'Projects',
        submenu: [{
            label: 'Projects',
            click: async () => {
                await window.loadURL('https://www.overleaf.com/project');
            }
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

const macOsMenu = (window: any) => {
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
        label: 'Projects',
        submenu: [{
            label: 'Projects',
            click: async () => {
                await window.loadURL('https://www.overleaf.com/project');
            }
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

export const getMenu = (window: any) => {
    return isDarwinPlatform() ? macOsMenu(window) : menu(window);
};