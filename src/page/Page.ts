interface PageInterFace {
    $: any,
    preprocess: () => void,
    action: (action: string, args: any) => void
}

export class Page implements PageInterFace {
    $: any

    constructor($: any) {
        this.$ = $;
    }

    action(action: string, args: any): void {
    }

    preprocess(): void {
    }
}