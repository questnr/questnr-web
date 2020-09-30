export class ActionMenu {
    mainTitle: string;
    mainImg: string;
    onClick: Function;
    actionMenuButtons: ActionMenuButton[];
}

export class ActionMenuButton {
    img: string;
    title: string;
    onClick: Function;
}