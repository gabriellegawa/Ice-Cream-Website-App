import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss']
})
export class UserRegisterFormComponent {
  registerForm !: FormGroup;

  @Input()
  user = new User();

  @Output("on-submit")
  emitter = new EventEmitter;

  constructor(private service: AppServiceService, private router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      veh_first_name: new FormControl(this.user.firstName, [Validators.required]),
      veh_last_name: new FormControl(this.user.lastName, [Validators.required]),
      veh_email: new FormControl(this.user.emailAddress, [Validators.required, Validators.email]),
      veh_phone_number: new FormControl(this.user.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      veh_password: new FormControl(this.user.password, [Validators.required]),
      veh_date_of_birth: new FormControl(this.user.dateOfBirth, [Validators.required]),
    })
  }

  handleRegister(): void {

  }


  redirectToLogin() {
    this.router.navigate(["user-login-form"])
  }

}
