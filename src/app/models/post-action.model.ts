import { User } from './user.model';
import { Community } from './community.model';
import { MetaData } from './common.model';
import { CommentAction } from './comment-action.model';
import { LikeAction } from './like-action.model';
import { HashTag } from './hashtag.model';

export class Post {
  postActionId: number;
  slug: string;
  postActionPrivacy: string;
  featured: boolean;
  popular: boolean;
  tags: string;
  userDTO: User;
  communityDTO: Community;
  metaData: MetaData;
  postType: string;
  postActionMeta: PostActionMeta;
  likeActionList: LikeAction[];
  commentActionList: CommentAction[];
  postMediaList: PostMedia[];
  hashTags: HashTag[];
  questionText: string;
  pollQuestion: PollQuestion;
  pollQuestionMeta: PollQuestionMeta;
  postData: NormalPostData;
}

export class NormalPostData {
  text: string;
  blogTitle: string;
  postEditorType: PostEditorType;
}

export enum PostEditorType {
  normal = "normal", blog = "blog"
}

export class PostMedia {
  postMediaLink: string;
  resourceType: string;
}

export class PostActionMeta {
  liked: boolean;
  totalLikes: number;
  totalComments: number;
  totalPostVisits: number;
}

export class PostActionForMedia {
  postActionId: number;
  userDTO: User;
  communityDTO: Community;
  postMediaList: PostMedia[];
}

export class PollQuestion {
  agreePercentage: number;
  disagreePercentage: number;
  agreeText: string;
  disagreeText: string;
}
export class PollQuestionMeta {
  pollAnswer: string;
  totalAnswered: number;
}
