import { User } from './user.model';
import { MetaData } from './common.model';

export class CommentAction {
    commentActionId: number;
    commentObject: string;
    userActorDTO: User;
    childCommentDTOSet: ChildCommentAction[];
    childComment: boolean;
    metaData: MetaData;
    commentActionMeta: CommentActionMeta;
}

export class ChildCommentAction {
    commentActionId: number;
    commentObject: string;
    userActorDTO: User;
    childComment: boolean;
    metaData: MetaData;
    commentActionMeta: CommentActionMeta;
}

export class CommentActionMeta {
    liked: boolean;
}