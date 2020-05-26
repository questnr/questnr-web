export class MetaList {
    metaInformation: MetaInformation;
    constructor(metaInformation: MetaInformation) {
        this.metaInformation = metaInformation;
    }
}

export class MetaInformation {
    constructor(type: string, content: string, attributeType: string) {
        this.type == type;
        this.content = content;
        this.attributeType = attributeType;
    }
    type: string;
    content: string;
    attributeType: string;
}

export class AvatarDTO {
    avatarLink: string;
}

export class MetaData {
    timeString: string;
    actionDate: string;
    actionDateForPost: string;
    createdAtTimeInUTC: string;
    createdAtTimestamp: number;
    updatedAtTimeInUTC: string;
    updatedAtTimestamp: number;
    edited: boolean
}