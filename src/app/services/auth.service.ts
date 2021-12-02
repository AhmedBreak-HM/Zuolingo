import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User> = null;
  user: User = new User();

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.user
  }
  SignUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  async SignUpGoogle(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);


  }
  async SignUpFacebook(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider);


  }
  Login(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);

  }
  Logout() {
    return this.afAuth.signOut();

  }
}
