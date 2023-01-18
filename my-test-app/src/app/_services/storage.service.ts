import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment"

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.localStorage.clear()
  }

  public setSession(authResult:any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second')

    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
    localStorage.setItem('firstName', authResult.firstName)
    localStorage.setItem('lastName', authResult.lastName)
    localStorage.setItem('email', authResult.email)
    localStorage.setItem('role', authResult.role)
  }

  logout() {
    localStorage.removeItem("id_token")
    localStorage.removeItem("expires_at")
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at")
    if (expiration != null) {
      const expiresAt = JSON.parse(expiration)
      return moment(expiresAt)
    }
    return 0
  }

  getRole() {
    return localStorage.getItem('role')
  }
}