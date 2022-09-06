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
        name: user.firstname,
        email: user.email,
        phone_number: user.phone_number
      },
    });
  }

  public async verifyUserAttribute(user: CognitoUser): Promise<any> {
    const currentuser = await Auth.currentAuthenticatedUser();
    if (user.email) {
      return Auth.verifyUserAttribute(currentuser, user.email);
    } else {
      return Auth.verifyUserAttribute(currentuser, user.phone_number);
    }
  }

  public async verifyUserAttributeSubmit(user: CognitoUser): Promise<any> {
    const currentuser = await Auth.currentAuthenticatedUser();
    if (user.email) {
      return Auth.verifyUserAttributeSubmit(currentuser, user.email,user.code);
    } else {
      return Auth.verifyUserAttributeSubmit(currentuser, user.phone_number,user.code);
    }
  }

  public async updateUserAttributes(user: CognitoUser): Promise<any> {
    const currentuser = await Auth.currentAuthenticatedUser();
    return Auth.updateUserAttributes(currentuser, {
      email: user.email,
      phone_number: user.phone_number,
    });
  }

  public confirmSignUp(user: CognitoUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: CognitoUser): Observable<any> {
    return defer(() => Auth.signIn(user.username, user.password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  public async signOut(): Promise<any> {
    await Auth.signOut();
    this.loggedIn.next(false);
  }

  public async resendSignUp(user: CognitoUser): Promise<any> {
    await Auth.resendSignUp(user.email);
  }

  public async forgotPassword(user: CognitoUser): Promise<any> {
    await Auth.forgotPassword(user.email);
  }

  public async forgotPasswordSubmit(user: CognitoUser): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code, user.password);
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
