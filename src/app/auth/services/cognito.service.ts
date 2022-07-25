import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable, tap } from 'rxjs';
import { Auth } from 'aws-amplify';



export interface IUser {
  Username: string;
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  // private authenticationSubject: BehaviorSubject<any>;
  public loggedIn: BehaviorSubject<boolean>;

  constructor() {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.Username,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.Username, user.code);
  }
 // public async signIn(user: IUser): Promise<any> {
  //   await Auth.signIn(user.Username, user.password);
  //   this.authenticationSubject.next(true);
  // }
 
  public signIn(user: IUser): Observable<any> {
    return  defer(() => Auth.signIn(user.Username, user.password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.loggedIn.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
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

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

}
