import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject= new Subject<boolean>();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  // current user that is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/user/current-user`);
  }

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user: store token
  public loginUser(token: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  }

  // check login status
  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      let tokenStr = localStorage.getItem('token');
      return !(tokenStr === undefined || tokenStr === '' || tokenStr === null);
    }
    return false;
  }

  // logout user
  public logout(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return true;
  }

  // get token
  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // set user details
  public setUser(user: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // get user
  public getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      let userStr = localStorage.getItem('user');
      if (userStr != null) {
        return JSON.parse(userStr);
      } else {
        this.logout();
      }
    }
    return null;
  }

  // get user role
  public getUserRole(): string {
    let user = this.getUser();
    return user?.authorities?.[0]?.authority ?? '';
  }
}
