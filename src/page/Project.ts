import { Page } from './Page';
import { Action } from '../action/Action';

export class Project extends Page {
    navShow: boolean = true
    footerShow: boolean = true

    preprocess() {
        this.toggleNav();
        this.toggleFooter();
        $('body>.content.project-list-page').css('min-height', 'calc(100vh)');
    }

    action(action: Action) {
        switch (action.type) {
            case 'ContactUs':
                this.actionContactUs();
                return;
            case 'AccountSettings':
                this.actionAccountSettings();
                return;
            case 'Subscription':
                this.actionSubscription();
                return;
            case 'LogOut':
                this.actionLogOut();
                return;
            case 'ToggleNavBar':
                this.toggleNav();
                return;
            case 'ToggleFooter':
                this.toggleFooter();
                return;
            default:
                console.warn('Unknown action');
        }
    }

    adjustMainHeight() {
        const main = $('main');
        const top = this.navShow ? 68 : 0;
        const minusHeight = 0 + (this.navShow ? 68 : 0) + (this.footerShow ? 50 : 0);
        main.css('top', `${top}px`);
        main.css('min-height', `calc(100vh - ${minusHeight}px)`);
    }

    toggleNav() {
        const nav = $('nav');
        if(this.navShow) {
            nav.hide();
            this.navShow = false;
        } else {
            nav.show();
            this.navShow = true;
        }
        this.adjustMainHeight();
    }

    toggleFooter() {
        const footer = $('footer');
        if(this.footerShow) {
            footer.hide();
            this.footerShow = false;
        } else {
            footer.show();
            this.footerShow = true;
        }
        this.adjustMainHeight();
    }

    actionContactUs() {
        $('a[ng-click="contactUsModal()"]')?.trigger('click');
    }

    actionAccountSettings() {
        $(window).attr('location','/user/settings');
    }

    actionSubscription() {
        $(window).attr('location','/user/subscription');
    }

    actionLogOut() {
        $('form[action="/logout"]')?.children('button')?.trigger('click');
    }
}