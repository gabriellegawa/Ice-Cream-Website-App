import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../_modal/modal.service';
import { AppServiceService } from '../../app-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss']
})
export class UserGalleryComponent implements OnInit {

  userList: User[] = []
  userToEdit?: User
  constructor(private service: AppServiceService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList() {
    this.service.getUserList().subscribe((Response) => {
      this.userList = Response;
      console.log('Response from API', Response)
    }, (error) => {
      console.error('error', Response)
    })
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
}
