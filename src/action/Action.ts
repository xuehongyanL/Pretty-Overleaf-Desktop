interface ActionInterface {
    type: string
}

export class Action implements ActionInterface {
    public type: string;

    constructor(type: string) {
        this.type = type;
    }
}