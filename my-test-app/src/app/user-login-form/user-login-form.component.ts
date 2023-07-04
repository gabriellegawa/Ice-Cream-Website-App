import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  loginForm !: FormGroup
  isLoggedIn: boolean = false
  isLoginFailed: boolean = false
  errorResponse: string = ''
  roles: string[] = []

  @Input()
  user = new User()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service: AppServiceService, private router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      veh_email: new FormControl(this.user.emailAddress, [Validators.required]),
      veh_password: new FormControl(this.user.password, [Validators.required])
    })
  }

  handleLogin(): void {
    const input = this.loginForm.value
    var loginUser = new User()

    loginUser.emailAddress = input.veh_email
    loginUser.password = input.veh_password

    const response = this.authService.login(loginUser).subscribe((Response) => {
      this.isLoginFailed = false
      this.isLoggedIn = true
      this.router.navigate(["service-gallery"])
    }, (error) => {
      this.errorResponse = error
      this.isLoginFailed = true
    })

  }

  failLogin() {
    this.isLoginFailed = true
    this.isLoggedIn = false
  }

  successfulLogin() {
    this.isLoggedIn = true
    this.isLoginFailed = false
  }

  resetLogin() {
    this.isLoggedIn = false
    this.isLoginFailed = false
  }

  redirectToRegister() {
    this.router.navigate(["user-register-form"])
  }

}
