import {User} from './user.model';
import {Community} from './community.model';
import {MetaData} from './common.model';
import {CommentAction} from './comment-action.model';
import {LikeAction} from './like-action.model';
import {HashTag} from './hashtag.model';

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
  postType: string;
  postActionMeta: PostActionMeta;
  likeActionList: LikeAction[];
  commentActionList: CommentAction[];
  totalLikes: number;
  totalComments: number;
  totalPostVisits: number;
  postMediaList: PostMedia[];
  hashTags: HashTag[];
  pollQuestion: PollQuestion;
  pollQuestionMeta: PollQuestionMeta;
}

export class PostMedia {
  postMediaLink: string;
  resourceType: string;
}

export class PostActionMeta {
  liked: boolean;
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
}
