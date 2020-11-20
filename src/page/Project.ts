import { Page } from './Page';

export class Project extends Page {
    preprocess() {
        $('.navbar-brand').remove();
        $('.site-footer').remove();
        $('body>.content.project-list-page').css('min-height', 'calc(100vh - 68px)');
    }

    action(action: string) {

    }
}