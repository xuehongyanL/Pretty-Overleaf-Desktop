import Store from '../app/Store';
import { lookup as dnsLookup } from 'dns';

export const store = new Store({
    configName: 'user-preferences',
    defaults: {
        autoHideMenu: false,
        width: 1280,
        height: 720,
        x: 0,
        y: 0
    }
});

export const getWindow = () => {
    return store.all();
};

export const setWindow = (x: number, y: number, width: number, height: number) => {
    store.set('x', x);
    store.set('y', y);
    store.set('width', width);
    store.set('height', height);
};

export const shouldMenuAutoHide = () => {
    return store.get('autoHideMenu');
};

export const lookup = (url: string) => {
    return new Promise((resolve, reject, ) => {
        dnsLookup(url, (err, _, __) => {
            if(err) {
                resolve(false);
            }
            resolve(true);
        });
    });
};

export const isDarwinPlatform = () => {
    return process.platform === 'darwin';
};