import { Injectable } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(public auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  signIn(email: string, password: string): Promise<any>{
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut():Promise<any>{
    return this.auth.signOut();
  }

  resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

}
