import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  isLoggedIn:boolean = false
  isLoginFailed:boolean = false
  errorMessage:string = ''
  roles: string[] = []

  @Input()
  user = new User()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service : AppServiceService, private router : Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true
      this.roles = this.storageService.getUser().roles
      this.router.navigate(["service-gallery"])
    }
  }

  handleLogin(nForm:NgForm): void {
    const input = nForm.value
    var loginUser = new User()

    loginUser.emailAddress = input.veh_emailAddress
    loginUser.password =  input.veh_password

    this.authService.login(loginUser).subscribe({
      next: data => {
        this.storageService.saveUser(data)

        this.isLoginFailed = false
        this.isLoggedIn = true
        this.roles = this.storageService.getUser().roles
        this.router.navigate(["service-gallery"])
      },
      error: err => {
        this.errorMessage = err.error.message
        this.isLoginFailed = true
      }
    })
  }

  

}
