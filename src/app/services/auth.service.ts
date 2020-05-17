import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string) {
    // return a new promise
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (error) => reject(error)
      );
    });
  }

  register(email: string, password: string) {
    // return a new promise
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (error) => reject(error)
      );
    });
  }

  getAuth() {
    return this.auth.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.auth.signOut();
  }
}
