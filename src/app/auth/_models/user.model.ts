// import { AuthModel } from './auth.model';
// import { AddressModel } from './address.model';
// import { SocialNetworksModel } from './social-networks.model';
//
// export class UserModel extends AuthModel {
//   id: number;
//   idToken: string;
//   username: string;
//   password: string;
//   displayName: string;
//   email: string;
//   pic: string;
//   roles: number[];
//   occupation: string;
//   companyName: string;
//   phone: string;
//   address?: AddressModel;
//   socialNetworks?: SocialNetworksModel;
//   // personal information
//   firstname: string;
//   lastname: string;
//   website: string;
//   // account information
//   language: string;
//   timeZone: string;
//   communication: {
//     email: boolean,
//     sms: boolean,
//     phone: boolean
//   };
//   // email settings
//   emailSettings: {
//     emailNotification: boolean,
//     sendCopyToPersonalEmail: boolean,
//     activityRelatesEmail: {
//       youHaveNewNotifications: boolean,
//       youAreSentADirectMessage: boolean,
//       someoneAddsYouAsAsAConnection: boolean,
//       uponNewOrder: boolean,
//       newMembershipApproval: boolean,
//       memberRegistration: boolean
//     },
//     updatesFromKeenthemes: {
//       newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
//       tipsOnGettingMoreOutOfKeen: boolean,
//       thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
//       newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
//       tipsOnMetronicBusinessProducts: boolean
//     }
//   };
//   users: any;
//
//   setUser(user: any) {
//     this.id = user.id;
//     this.username = user.username || '';
//     this.password = user.password || '';
//     this.displayName = user.displayName || '';
//     this.email = user.email || '';
//     this.pic = user.pic || './assets/media/users/default.png';
//     this.roles = user.roles || [];
//     this.occupation = user.occupation || '';
//     this.companyName = user.companyName || '';
//     this.phone = user.phone || '';
//     this.address = user.address;
//     this.socialNetworks = user.socialNetworks;
//   }
// }
