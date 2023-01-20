import { Component, OnInit, Input } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { User } from '../../models/user'
import { ModalService } from 'src/app/_modal';

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

  userToEdit?: User

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  editUser(u: User) {
    this.userToEdit = u
  }

  commitEdit(u: User) {
    //Commit to the database

    this.ngOnInit();

    window.location.reload();

    this.userToEdit = undefined
  }

  onCancel() {

    this.userToEdit = undefined
  }

  String(number: number) {
    return String(number)
  }

}
