interface PageInterFace {
    $: any,
    preprocess: () => void,
    action: (action: string) => void
}

export class Page implements PageInterFace {
    $: any

    constructor($: any) {
        this.$ = $;
    }

    action(action: string): void {
    }

    preprocess(): void {
    }
}