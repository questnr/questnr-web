import { User } from './user.model';
import { Community } from './community.model';
import { MetaData } from './common.model';
import { CommentAction } from './comment-action.model';
import { LikeAction } from './like-action.model';

export class Post {
    postActionId: number;
    slug: string;
    text: string;
    postActionPrivacy: string;
    featured: boolean;
    popular: boolean;
    tags: string;
    userDTO: User;
    communityDTO: Community;
    metaData: MetaData;
    postActionMeta: PostActionMeta;
    likeActionList: LikeAction[];
    commentActionList: CommentAction[];
    totalLikes: number;
    totalComments: number;
    totalPostVisits: number;
    postMediaList: PostMedia[];
}

class PostMedia {
    postMediaLink: string;
    resourceType: string;
}

export class PostActionMeta {
    liked: boolean;
}

