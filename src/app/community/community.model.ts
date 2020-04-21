export class Community {
  communityName: string;
  description: string;
  rules: string;
  slug: string;
  // ownerUser: user;
  status: string;
  avatar: Avatar;

}


export class Avatar {
  avatarId: number;
  avatarKey: string;
}
