import { AvatarDTO } from '/Users/brijeshlakkad/Documents/Questnr/questnr-web/src/app/models/common.model';
import { RelationType } from '/Users/brijeshlakkad/Documents/Questnr/questnr-web/src/app/models/relation-type';

export class User {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    slug: string;
    avatarDTO: AvatarDTO;
    banner: AvatarDTO;
    userMeta: UserMeta;
    bio: string;
    dob: string;
}

export class UserMeta {
    relationShipType: RelationType;
}

export class UserInfo {
    followers: number;
    followingTo: number;
    postsOnProfile: number;
    postsOnCommunities: number;
    posts: number;
    totalQuestions: number;
    ownsCommunities: number;
    followsCommunities: number;
}

export class UserInterest {
    interest: string;
}

export class LocalUser {
    created: number;
    emailId: string;
    exp: number;
    iat: number;
    id: number;
    name: string;
    role: string[];
    slug: string;
    sub: string;
}
