import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Role } from 'src/app/models/role';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss']
})
export class UpdateUserFormComponent implements OnInit {
  updateUserForm !: FormGroup


  @Input()
  user = new User()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service: AppServiceService, public dialogRef: MatDialogRef<UpdateUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    this.user = data;
  }

  ngOnInit(): void {
    this.updateUserForm = new FormGroup({
      veh_firstName: new FormControl(
        this.user.firstName, [Validators.minLength(3), Validators.required]),
      veh_lastName: new FormControl(
        this.user.lastName, [Validators.minLength(3), Validators.required]),
      veh_emailAddress: new FormControl(
        this.user.emailAddress, [Validators.email, Validators.required]),
      veh_phoneNumber: new FormControl(
        this.user.phoneNumber, [Validators.minLength(3), Validators.required]),
      veh_dateOfBirth: new FormControl(
        this.user.dateOfBirth, [Validators.minLength(3), Validators.required]),
      veh_password: new FormControl(
        this.user.password, [Validators.minLength(3), Validators.required]),
    })
  }

  handleUpdate() {
    const input = this.updateUserForm.value
    const val = new User({
      _id: this.user._id,
      firstName: input.veh_firstName,
      lastName: input.veh_lastName,
      emailAddress: input.veh_emailAddress,
      phoneNumber: input.veh_phoneNumber,
      dateOfBirth: input.veh_dateOfBirth,
      password: input.veh_password,
      role: Role.Employee
    })

    this.service.updateUser(val).subscribe(
      data => console.log('Success!', data),
      error => console.error('error!', error)
    )

    this.emitter.emit(val)
    this.service.reloadComponent(true);
  }

}
