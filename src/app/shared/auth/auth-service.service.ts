// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
//
// import { auth } from 'firebase/app';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//
// import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { IUserAuth } from './user-auth.model';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {
//   user$: Observable<any>;
//
//   constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
//     this.user$ = this.afAuth.authState.pipe(
//       switchMap(user => {
//         // Logged in
//         if (user) {
//           return this.afs.doc<IUserAuth>(`users/${user.uid}`).valueChanges();
//         } else {
//           // Logged out
//           return of(null);
//         }
//       })
//     );
//   }
//
//   async googleSignIn(): Promise<any> {
//     const provider = new auth.GoogleAuthProvider();
//     try {
//       const credential = await auth().signInWithPopup(provider);
//       console.warn(credential.user);
//       return this.updateUserData(credential.user);
//     } catch (err) {
//       console.warn('deu erro kkkkk');
//     }
//   }
//
//   async gitHubSignIn(): Promise<any> {
//     const provider = new auth.GithubAuthProvider();
//     const credential = await auth().signInWithPopup(provider);
//     console.warn(credential.user);
//     return this.updateUserData(credential.user);
//   }
//   /*
//  async facebookSignIn(): Promise<any> {
//    const provider = new auth.FacebookAuthProvider();
//    const credential = await this.afAuth.auth.signInWithPopup(provider);
//    console.warn(credential.user);
//    return this.updateUserData(credential.user);
//  }
// */
//
//   private updateUserData(user: any): Promise<any> {
//     // Sets user data to firestore on login
//     const userRef: AngularFirestoreDocument<IUserAuth> = this.afs.doc(`users/${user.uid}`);
//
//     const data = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL
//     };
//
//     return userRef.set(data, { merge: true });
//   }
//
//   /*
//   async signOut(): Promise<void> {
//     await this.afAuth.auth.signOut();
//     this.router.navigate(['/']);
//   }
//   */
// }
