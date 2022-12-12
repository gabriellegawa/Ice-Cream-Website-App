import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {
  
  @Input()
  user = new User()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service : AppServiceService, private router : Router) { }

  ngOnInit(): void {
  }

  handleLogin(nForm:NgForm) {
    const input = nForm.value

    var loginUser = new User()
    loginUser.emailAddress = input.veh_emailAddress
    loginUser.password = input.veh_password
    
    this.service.getUser(loginUser).subscribe((Response) => {
      let copy = Object.assign({}, Response)
      console.log("Response from API", Response)

      console.log(copy)

      if (copy.emailAddress == input.veh_emailAddress && copy.password == input.veh_password) {
        this.router.navigate(["service-gallery"])
      }
    }, error => {
      console.log("error", error)
    })
  }

}
