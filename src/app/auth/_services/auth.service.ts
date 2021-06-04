// import {Injectable, OnDestroy} from '@angular/core';
// import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
// import {catchError, finalize, map, switchMap} from 'rxjs/operators';
// // import {UserModel} from '../_models/user.model';
// import {AuthModel} from '../_models/auth.model';
// import {AuthHTTPService} from './auth-http';
// import {environment} from 'src/environments/environment';
// import {Router} from '@angular/router';
// import {AuthResponseData} from './authResponseData';
// import {AngularFireAuth} from '@angular/fire/auth';
// import firebase from 'firebase';
// import auth = firebase.auth;
//
//
// @Injectable({
//     providedIn: 'root',
// })
//
//
// export class AuthService implements OnDestroy {
//     // private fields
//
//
//     // public fields
//     currentUser$: Observable<UserModel>;
//     isLoading$: Observable<boolean>;
//     currentUserSubject: BehaviorSubject<UserModel>;
//     isLoadingSubject: BehaviorSubject<boolean>;
//     private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
//     private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
//
//     constructor(
//         private authHttpService: AuthHTTPService,
//         public afAuth: AngularFireAuth,
//         private router: Router
//     ) {
//         this.isLoadingSubject = new BehaviorSubject<boolean>(false);
//         this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
//         this.currentUser$ = this.currentUserSubject.asObservable();
//         this.isLoading$ = this.isLoadingSubject.asObservable();
//         const subscr = this.getUserByUserId().subscribe();
//         this.unsubscribe.push(subscr);
//     }
//
//     get currentUserValue(): UserModel {
//         return this.currentUserSubject.value;
//     }
//
//     set currentUserValue(user: UserModel) {
//         this.currentUserSubject.next(user);
//     }
//
//
//     // Sign in with Google
//     GoogleAuth() {
//         console.log('Trying google auth manenoz');
//         return this.AuthLogin(new auth.GoogleAuthProvider());
//     }
//
//     AuthLogin(provider) {
//         this.isLoadingSubject.next(true);
//         return this.afAuth.signInWithPopup(provider)
//             .then((result) => {
//                 console.log(result);
//                 console.log('You have been successfully logged in!');
//                 const authObj = null;
//
//                 // authObj.idToken = result.
//                 const returnValue = this.setAuthFromLocalStorage(authObj);
//                 return returnValue;
//                 this.isLoadingSubject.next(false);
//             }).catch((error) => {
//                 console.log(error);
//             });
//     }
//
//     // need create new user then login
//     registration(user: UserModel): Observable<AuthResponseData> {
//         this.isLoadingSubject.next(true);
//
//         return this.authHttpService.createUser(user).pipe(
//             map(() => {
//                 this.isLoadingSubject.next(false);
//             }),
//             switchMap(() => this.login(user.email, user.password)
//             ),
//             catchError((err) => {
//                 console.error('err', err);
//                 return of(undefined);
//             }),
//             finalize(() => {
//                 console.log('localStorage.getItem(this.authLocalStorageToken)');
//                 console.log(localStorage.getItem(this.authLocalStorageToken));
//
//                 this.authHttpService.registerCustomerBackend(user).subscribe((item) => {
//                     console.log('This is the item');
//                     console.log(item);
//                     this.sendEmailVerification(JSON.parse(localStorage.getItem(this.authLocalStorageToken)));
//                     this.isLoadingSubject.next(false);
//                 });
//             })
//         );
//     }
//
//     // public methods
//     login(email: string, password: string): Observable<UserModel> {
//         this.isLoadingSubject.next(true);
//         const user: UserModel = new UserModel();
//         user.email = email;
//         user.password = password;
//         return this.authHttpService.login(user).pipe(
//             map((authObj: AuthModel) => {
//                 console.log(authObj);
//                 const result = this.setAuthFromLocalStorage(authObj);
//                 return result;
//             }),
//             switchMap(() => this.getUserByUserId()),
//             catchError((err) => {
//                 console.error('err', err);
//                 return of(undefined);
//             }),
//             finalize(() => this.isLoadingSubject.next(false))
//         );
//     }
//
//     logout() {
//         localStorage.removeItem(this.authLocalStorageToken);
//         this.router.navigate(['/auth/login'], {
//             queryParams: {},
//         });
//     }
//
//     getUserByUserId() {
//         const authObj = this.getAuthFromLocalStorage();
//
//
//         if (!authObj || !authObj.refreshToken) {
//             return of(undefined);
//         }
//
//         this.isLoadingSubject.next(true);
//
//         return this.authHttpService.getUserByUserId(authObj.idToken).pipe(
//             map((user: UserModel) => {
//
//                 console.log(user);
//
//                 if (user) {
//                     this.currentUserSubject = new BehaviorSubject<UserModel>(user);
//                     console.log(this.currentUserSubject);
//                 } else {
//                     this.logout();
//                 }
//                 return user;
//             }),
//             finalize(() => this.isLoadingSubject.next(false))
//         );
//     }
//
//
//     forgotPassword(email: string): Observable<boolean> {
//         this.isLoadingSubject.next(true);
//         return this.authHttpService
//             .forgotPassword(email)
//             .pipe(finalize(() => this.isLoadingSubject.next(false)));
//     }
//
//     ngOnDestroy() {
//         this.unsubscribe.forEach((sb) => sb.unsubscribe());
//     }
//
//     // private methods
//     private setAuthFromLocalStorage(authObj: AuthModel): boolean {
//         // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
//         console.log('Storing stuff in local storage.');
//         if (authObj && authObj.refreshToken) {
//
//             localStorage.setItem(this.authLocalStorageToken, JSON.stringify(authObj));
//             return true;
//         }
//         return false;
//     }
//
//     private getAuthFromLocalStorage(): AuthResponseData {
//         try {
//             const authData = JSON.parse(
//                 localStorage.getItem(this.authLocalStorageToken)
//             );
//             return authData;
//         } catch (error) {
//             console.error(error);
//             return undefined;
//         }
//     }
//
//     private sendEmailVerification(idToken: string) {
//         this.isLoadingSubject.next(true);
//         return this.authHttpService
//             .sendVerificationEmail(idToken)
//             .pipe(finalize(() => this.isLoadingSubject.next(false)));
//     }
//
//     private checkEmailVerification(idToken: string) {
//         this.isLoadingSubject.next(true);
//         return this.authHttpService
//             .sendVerificationEmail(idToken)
//             .pipe(finalize(() => this.isLoadingSubject.next(false)));
//     }
// }
