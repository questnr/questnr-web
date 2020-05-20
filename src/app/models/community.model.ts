import { AvatarDTO, MetaList } from './common.model';
import { User } from './user.model';

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
  metaList: MetaList[];
  tags: string;
  // metaData: MetaData;
  communityMeta: CommunityMeta;
}
export class UserMeta {
  relationShipType: string;
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
  relationShipType: string;
}
