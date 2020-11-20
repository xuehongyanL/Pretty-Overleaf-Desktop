import { BrowserWindow, KeyboardEvent, MenuItem, MenuItemConstructorOptions, shell } from 'electron'
import Store from '../app/store'
import {lookup as dnsLookup} from 'dns'

const store = new Store({
    configName: 'user-preferences',
    defaults: {
        autoHideMenu: false,
        width: 1280,
        height: 720,
        x: 0,
        y: 0
    }
})

export const getWindow = () => {
    return store.all()
}

export const setWindow = (x: number, y: number, width: number, height: number) => {
    store.set('x', x)
    store.set('y', y)
    store.set('width', width)
    store.set('height', height)
}

export const shouldMenuAutoHide = () => {
    return store.get('autoHideMenu')
}

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
                const newHide = !store.get('autoHideMenu')
                if (newHide) {
                    bw?.setAutoHideMenuBar(true)
                } else {
                    bw?.setAutoHideMenuBar(false)
                    bw?.setMenuBarVisibility(true)
                }
                store.set('autoHideMenu', newHide)
                menuItem.checked = newHide
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
                await shell.openExternal('https://www.overleaf.com/legal')
            }
        }, {
            label: 'Security',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/legal#Security')
            }
        }, {
            label: 'Contact Us',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/contact')
            }
        }, {
            label: 'About',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/about')
            }
        }, {
            label: 'Blog',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/blog')
            }
        }]
    }]

    return tmpl
}

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
                await shell.openExternal('https://www.overleaf.com/legal')
            }
        }, {
            label: 'Security',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/legal#Security')
            }
        }, {
            label: 'Contact Us',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/contact')
            }
        }, {
            label: 'About',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/about')
            }
        }, {
            label: 'Blog',
            click: async () => {
                await shell.openExternal('https://www.overleaf.com/blog')
            }
        }]
    }]

    return tmpl
}

export const lookup = (url: string) => {
    return new Promise((resolve, reject, ) => {
        dnsLookup(url, (err, _, __) => {
            if(err) {
                resolve(false)
            }
            resolve(true)
        })
    })
}

export const getMenu = () => {
    return isDarwinPlatform() ? macOsMenu() : menu()
}

export const isDarwinPlatform = () => {
    return process.platform === "darwin"
}