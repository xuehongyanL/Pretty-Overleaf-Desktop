import { Page } from './Page';
import { Project } from './Project';

interface PageFactoryInterface {
    $: any
    build: (url: string) => Page | null
}

export class PageFactory implements PageFactoryInterface {
    $: any

    constructor($: any) {
        this.$ = $;
    }

    build(url: string): Page | null {
        if (url.endsWith('/project')) {
            return new Project($);
        }
        return null;
    }
}