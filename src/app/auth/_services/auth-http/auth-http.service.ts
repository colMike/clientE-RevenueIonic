// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {environment} from '../../../../environments/environment';
// import {UserModel} from '../../_models/user.model';
// import {Observable} from 'rxjs';
//
//
//
//
//
// const API_USERS_URL = `${environment.apiUrl}/users`;
//
// class CustomerObj {
//
//     active: string;
//     address: string;
//     approved: string;
//     createdBy: number;
//     customername: string;
//     email: string;
//     firstname: string;
//     lastname: string;
//     phonenumber: string;
//     secondname: string;
//     userEmail: string;
//     userName: string;
//     userNationalId: number;
//     userPhone: string;
// }
//
//
// @Injectable({
//     providedIn: 'root',
// })
// export class AuthHTTPService {
//     constructor(private http: HttpClient) {
//     }
//
//     createUser(user: UserModel) {
//
//         return this.http.post(
//             `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
//             {email: user.email, password: user.password, returnSecureToken: true}
//         );
//     }
//
//     registerCustomerBackend(user: UserModel) {
//
//         const sendObj: CustomerObj = new CustomerObj();
//
//         sendObj.customername = user.displayName;
//         sendObj.email = user.email;
//         sendObj.phonenumber = user.phone;
//
//         console.log('sendObj from customer registration');
//         console.log(sendObj);
//
//         return this.http.post(
//             `${environment.faimaBackendUrl}/revenueCollection/api/CustomerService/addCustomers`,
//             sendObj
//         );
//     }
//
//     login(user: UserModel) {
//         return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
//             {email: user.email, password: user.password, returnSecureToken: true});
//     }
//
//     getUserByUserId(userId) {
//         // const httpHeaders = new HttpHeaders({
//         //     Authorization: `Bearer ${token}`,
//         // });
//         return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebaseAPIKey}`, {
//             idToken: userId
//         });
//     }
//
//     //
//     // // CREATE =>  POST: add a new user to the server
//     // createUser(user: UserModel): Observable<UserModel> {
//     //   return this.http.post<UserModel>(API_USERS_URL, user);
//     // }
//     //
//     // // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
//     forgotPassword(email: string): Observable<any> {
//         return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebaseAPIKey}`, {
//             requestType: 'PASSWORD_RESET',
//             email
//         });
//     }
//
//
//     sendVerificationEmail(idToken: string): Observable<any> {
//         return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebaseAPIKey}`, {
//             requestType: 'VERIFY_EMAIL',
//             idToken
//         });
//     }
//
// };
