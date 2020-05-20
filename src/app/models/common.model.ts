export class MetaList {
    metaInformation: MetaInformation;
}

export class MetaInformation {
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