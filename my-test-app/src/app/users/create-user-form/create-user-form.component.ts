import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role';
import { AppServiceService } from '../../app-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  createUserForm !:FormGroup

  @Input()
  newUser = new User()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service : AppServiceService) { }

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      veh_firstName: new FormControl(
      this.newUser.firstName, [Validators.minLength(3), Validators.required]),
      veh_lastName: new FormControl(
      this.newUser.lastName, [Validators.minLength(3), Validators.required]),
      veh_emailAddress: new FormControl(
      this.newUser.emailAddress, [Validators.email, Validators.required]),
      veh_phoneNumber: new FormControl(
      this.newUser.phoneNumber, [Validators.minLength(3), Validators.required]),
      veh_dateOfBirth: new FormControl(
      this.newUser.dateOfBirth, [Validators.minLength(3), Validators.required]),
      veh_password: new FormControl(
      this.newUser.password, [Validators.minLength(3), Validators.required]),
      veh_confirmPassword: new FormControl(
      this.newUser.password, [Validators.minLength(3), Validators.required]),
      })
  }

  handleCreate(){
    const input = this.createUserForm.value

    const user = new User({ 
      _id: input.veh__id,
      firstName: input.veh_firstName,
      lastName: input.veh_lastName,
      emailAddress: input.veh_emailAddress,
      phoneNumber: input.veh_phoneNumber,
      dateOfBirth: input.veh_dateOfBirth,
      password: input.veh_password,
      role: Role.Employee
    })

    this.service.registerUser(user).subscribe(
      data => console.log('Success!', data),
      error => console.error('error!', error)
    )
    
    console.log(user)
    
    this.handleClear()

    this.emitter.emit()
  }

  handleClear(){
    this.createUserForm.controls.veh_firstName.reset();
    this.createUserForm.controls.veh_lastName.reset();
    this.createUserForm.controls.veh_emailAddress.reset();
    this.createUserForm.controls.veh_phoneNumber.reset();
    this.createUserForm.controls.veh_dateOfBirth.reset();
    this.createUserForm.controls.veh_password.reset();
    this.createUserForm.controls.veh_confirmPassword.reset();
  }
}
