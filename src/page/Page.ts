import { Action } from '../action/Action';

interface PageInterFace {
    $: any,
    preprocess: () => void,
    action: (action: Action) => void
}

export class Page implements PageInterFace {
    $: any

    constructor($: any) {
        this.$ = $;
    }

    action(action: Action): void {
    }

    preprocess(): void {
    }
}