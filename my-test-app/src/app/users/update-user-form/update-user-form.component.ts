import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {

  @Input()
  user = new User()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service : AppServiceService) { }

  ngOnInit(): void {
  }

  handleUpdate(nForm:NgForm){
    const input = nForm.value
    const val = new User({
      _id: input.veh__id,
      firstName: input.veh_firstName,
      lastName: input.veh_lastName,
      emailAddress: input.veh_emailAddress,
      phoneNumber: input.veh_phoneNumber,
      dateOfBirth: input.veh_dateOfBirth,
      password: input.veh_password
    })
    
    this.service.updateUser(val).subscribe(
      data => console.log('Success!', data),
      error => console.error('error!', error)
    )

    console.log(val)

    this.emitter.emit(val)
  }

}
