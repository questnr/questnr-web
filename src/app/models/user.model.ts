import { AvatarDTO } from './common.model';

export class User {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    slug: string;
    avatarDTO: AvatarDTO;
    userMeta: UserMeta;
}

export class UserMeta {
    relationShipType: string;
}