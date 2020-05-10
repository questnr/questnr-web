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
  metaList: MetaList;
  metaData: CommunityMetaData;
}

export class CommunityMetaData {
  timeString: string;
  actionDate: string;
  actionDateForPost: string;
  edited: boolean;
}
//
// {
//   "communityId": 22,
//   "communityName": "dfsfdf1212",
//   "description": "asasas",
//   "rules": null,
//   "slug": "dfsfdf1212--3878867685923659497",
//   "ownerUserDTO": {
//   "userId": 66,
//     "username": "satish",
//     "firstName": null,
//     "lastName": null,
//     "emailId": "user1@gmail.com",
//     "avatarDTO": {
//     "avatarLink": "https://questnr-user-files.s3.ap-southeast-1.amazonaws.com/users/66/1585574407836-user1_avatar.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200425T162010Z&X-Amz-SignedHeaders=host&X-Amz-Expires=40&X-Amz-Credential=AKIAQFONFFIYAZBD7B54%2F20200425%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=5f9c4ac86809703eb945e0c19b8b58bf017367076ebcf6779603e027aa0c7af7"
//   }
// },
//   "status": null,
//   "avatarDTO": {
//   "avatarLink": "https://questnr-user-files.s3.ap-southeast-1.amazonaws.com/communities/22/1587045237144-user1_avatar.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200425T162010Z&X-Amz-SignedHeaders=host&X-Amz-Expires=39&X-Amz-Credential=AKIAQFONFFIYAZBD7B54%2F20200425%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=ec70ca6c30a65819764bcfa0a8b12243715ba5f00ac9c6a15b38aa7337e0f55f"
// },
//   "communityUsers": [
//   {
//     "communityUser": {
//       "userId": 69,
//       "username": "aman",
//       "firstName": null,
//       "lastName": null,
//       "emailId": "user4@gmail.com",
//       "avatarDTO": {
//         "avatarLink": null
//       }
//     }
//   }
// ],
//   "metaList": [
//   {
//     "id": 0,
//     "metaInformation": {
//       "type": "description",
//       "content": "asasas",
//       "attributeType": "name"
//     }
//   }
// ],
//   "metaData": {
//   "timeString": "1w",
//     "actionDate": "16 April 2020",
//     "actionDateForPost": "16 April",
//     "edited": false
// }
// }
