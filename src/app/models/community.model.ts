import { AvatarDTO, MetaList, MetaTagCard } from './common.model';
import { User } from './user.model';
import { RelationType } from './relation-type';

export class Community {
  communityId: number;
  communityName: string;
  description: string;
  rules: string;
  slug: string;
  ownerUserDTO: User;
  status: string;
  avatarDTO: AvatarDTO;
  communityUsers: User[];
  tags: string;
  // metaData: MetaData;
  communityMeta: CommunityMeta;
  communityPrivacy: string;
}

export class CommunityPublic extends Community {
  metaTagCard: MetaTagCard;
}

export class CommunityUsers {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  emailId: string;
  avatarDTO: AvatarDTO;
}

export class MetaInformation {
  type: string;
  content: string;
  attributeType: string;
  metaData: CommunityMetaData;
}

export class CommunityMetaData {
  timeString: string;
  actionDate: string;
  actionDateForPost: string;
  edited: boolean;
}
export class CommunityMeta {
  relationShipType: RelationType;
}
export class CommunityProfileMeta {
  followers: string;
  posts: string;
  trendRank: string;
  inTrend: boolean;
}