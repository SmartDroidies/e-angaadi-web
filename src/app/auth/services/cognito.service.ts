import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable, tap } from 'rxjs';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '../models/cognito-user';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  public loggedIn: BehaviorSubject<boolean>;

  constructor() {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: CognitoUser): Promise<any> {
    return Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        phonenumber: user.phonenumber,
        email:user.email
      },
    });
  }

  public confirmSignUp(user: CognitoUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: CognitoUser): Observable<any> {
    return defer(() => Auth.signIn(user.username,user.password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  public async signOut(): Promise<any> {
    await Auth.signOut();
    this.loggedIn.next(false);
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  async isAuthenticated(): Promise<boolean> {
    if (this.loggedIn.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
    }
  }

}
