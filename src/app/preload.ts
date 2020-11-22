import { ipcRenderer } from 'electron';
import { PageFactory } from '../page/PageFactory';
import { Page } from '../page/Page';

const bootstrapPDFButton = (ideToolbar: HTMLElement) => {
    const openBtn = document.createElement('a');
    openBtn.addEventListener('click', () => {
        const el: HTMLElement | null = document.querySelector('.toolbar.toolbar-pdf .fa.fa-download');
        el?.click();
    });
    openBtn.style.cursor = 'pointer';
    openBtn.setAttribute('tooltip', 'View PDF In Separate Window');
    openBtn.setAttribute('tooltip-placement', 'bottom');
    openBtn.setAttribute('tooltip-append-to-body', 'true');

    const openBtnIcn = document.createElement('i');
    openBtnIcn.className = 'fa fa-fw fa-external-link';
    openBtn.append(openBtnIcn);
    ideToolbar.appendChild(openBtn);
};

const loop = setInterval(() => {
    const ideToolbar = document.querySelector('.toolbar.toolbar-editor.ng-scope .toolbar-right') as HTMLElement;

    if (ideToolbar) {
        const fullScrnBtn = ideToolbar.querySelector('.fa.fa-expand')?.parentElement;
        const splitScrnBtn = ideToolbar.querySelector('.fa.fa-compress')?.parentElement;
        const pdfToolbar = document.querySelector('.toolbar.toolbar-pdf');

        bootstrapPDFButton(ideToolbar);

        const eastPane = document.querySelector('.ui-layout-east.ui-layout-pane.ui-layout-pane-east') as HTMLElement;
        if (eastPane && eastPane.style.display == 'none') {
            const recomp = document.getElementById('recompile');
            if (recomp) {
                ideToolbar.appendChild(recomp);
                recomp.style.marginRight = '0px';
            }
        }

        fullScrnBtn?.addEventListener('click', () => {
            const recomp = document.getElementById('recompile');
            if (recomp) {
                ideToolbar.appendChild(recomp);
                recomp.style.marginRight = '0px';
            }
        });

        splitScrnBtn?.addEventListener('click', () => {
            pdfToolbar?.append(document.getElementById('recompile')!);
        });

        const delBtnLoop = setInterval(() => {
            const dlBtn = document.querySelector('.toolbar.toolbar-pdf .fa.fa-download') as HTMLElement;
            if (dlBtn) {
                dlBtn.style.display = 'none';
                clearInterval(delBtnLoop);
            }
        }, 200);

        clearInterval(loop);
    }
}, 200);

let page: Page | null;

window.onload = () => {
    const $ = require('jquery');
    const url = window.location.href;
    page = new PageFactory($).build(url);
    if (page !== null) {
        page.preprocess();
    } else {
        console.warn('No valid page found.');
    }
};

ipcRenderer.on('send-to-renderer', (event, action, args) => {
    page?.action(action, args);
});