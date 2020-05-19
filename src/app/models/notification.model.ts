import { MetaData } from './common.model';
import { User } from './user.model';
import { Community } from './community.model';
import { PostMedia } from './post-action.model';

export class NotificationDTO {
  notificationId: number;
  userActor: User;
  community: Community;
  postMedia: PostMedia;
  message: string;
  notificationType: string;
  clickAction: string;
  opened: boolean;
  metaData: MetaData;
}