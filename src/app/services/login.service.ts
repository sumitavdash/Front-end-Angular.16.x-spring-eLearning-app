import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //current user who are logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generete token

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user: will set token in local storage

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //is User is logged in or not

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //if user want to logout : i have to remove token as well as user details from local storage

  public logOut() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // return true;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // this.loginStatusSubject.next(false); // Emit the logout state (false)
    return true;
  }

  //kabhi jarurat hua to get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //i do not want to fire request multiple times from backed to get user details , so i want to set user details in local storage
  //Set user details
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOut();
      return null;
    }
  }
  // get user Role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  // Update user profile
  public updateUserProfile(user: any) {
    return this.http.put(`${baseUrl}/update-profile`, user);
  }
}
