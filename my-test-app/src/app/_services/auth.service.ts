import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators'
import { map } from 'rxjs/operators';
import * as moment from "moment"


const AUTH_API = 'http://localhost:4200/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string = '';
  private expiresIn: number = 0;
  private logged = new BehaviorSubject<boolean>(false);
  isLogged = this.logged.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: User): Observable<any> {
    var email = user.emailAddress
    var password = user.password

    var obj: any = {}
    obj.userName = email
    obj.password = password

    const body = JSON.stringify(obj);
    console.log(body)

    return this.http.post<AuthResponse>('/backend/auth/login', obj).pipe(
      tap(res => this.setAuthResponse(res)),
      shareReplay()
    )
  }

  set token(token: string) {
    this.accessToken = token;
    localStorage.setItem('access_token', token);
  }

  get token(): string {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('access_token') || '';
    }
    return this.accessToken;
  }

  private setAuthResponse(response: AuthResponse) {
    this.accessToken = response.accessToken
    this.expiresIn = response.expiresIn


    const expiresAt = moment().add(response.expiresIn, 'second')
    localStorage.setItem('id_token', response.accessToken)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))

    this.logged.next(true);
  }

  checkStatus() {
    if (this.token) {
      this.logged.next(true);
    } else {
      this.logged.next(false);
    }
  }


  redirectToLogin() {
    this.router.navigate(['user-login-form']);
  }


}