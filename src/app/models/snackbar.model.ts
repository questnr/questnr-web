export enum ActionType {
    learnMore = "Learn More",
    close = "close"
}

export class SnackBarDefaultData {
    duration?: number;
    actionType?: ActionType = ActionType.close;
    message: string;
    onAction?: Function = () => { };
}
