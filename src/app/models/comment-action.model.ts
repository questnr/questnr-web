import { User } from '/Users/brijeshlakkad/Documents/Questnr/questnr-web/src/app/models/user.model';
import { MetaData } from '/Users/brijeshlakkad/Documents/Questnr/questnr-web/src/app/models/common.model';
import { PostMedia } from '/Users/brijeshlakkad/Documents/Questnr/questnr-web/src/app/models/post-action.model';

export class CommentAction {
    commentActionId: number;
    commentObject: string;
    userActorDTO: User;
    childCommentDTOSet: ChildCommentAction[];
    childComment: boolean;
    metaData: MetaData;
    commentActionMeta: CommentActionMeta;
    commentMediaList: PostMedia[];
}

export class ChildCommentAction {
    commentActionId: number;
    commentObject: string;
    userActorDTO: User;
    childComment: boolean;
    metaData: MetaData;
    commentActionMeta: CommentActionMeta;
    commentMediaList: PostMedia[];
}

export class CommentActionMeta {
    liked: boolean;
}

export enum CommentParentClassType {
    feed = 'feed',
    singlePost = 'singlePost'
}
