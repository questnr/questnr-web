import { AvatarDTO } from './common.model';
import { RelationType } from './relation-type';

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

export class UserListViewVariables {
    public static get small() {
        return {
            profileIconSize: 50
        }
    }
    public static get large() {
        return {
            profileIconSize: 60
        }
    }
}

export enum UserListViewSizeType {
    small = 'small', large = 'large'
}