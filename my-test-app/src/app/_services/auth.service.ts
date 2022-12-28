import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const AUTH_API = 'http://localhost:4200/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    var email = user.emailAddress
    var password = user.password

    var newUser = new User()
    newUser.emailAddress = email
    newUser.password = password

    return this.http.put<User>('/api/getUser', newUser);
  }
}