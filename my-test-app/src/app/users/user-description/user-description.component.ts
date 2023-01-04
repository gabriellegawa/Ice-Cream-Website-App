import { Component, OnInit, Input } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { User } from '../../models/user'

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss']
})
export class UserDescriptionComponent implements OnInit {

  @Input()
  currentUser: User = new User()
  @Input()
  currentIndex: number = 0

  userToEdit?:User

  constructor() { }

  ngOnInit(): void {
  }

  editUser(u:User){
    console.log(u)
    this.userToEdit=u
  }

  commitEdit(u:User){
    //Commit to the database

    this.ngOnInit();

    // console.log(u)
    window.location.reload();

    this.userToEdit=undefined
  }

  onCancel(){
    
    this.userToEdit=undefined
  }
}
