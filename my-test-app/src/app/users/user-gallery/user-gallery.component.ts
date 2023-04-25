import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../_modal/modal.service';
import { AppServiceService } from '../../app-service.service';
import { User } from '../../models/user';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss']
})
export class UserGalleryComponent implements OnInit {

  constructor(public modalService: ModalService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createUser() {
    const dialogRef = this.dialog.open(CreateUserFormComponent, {
      width: '25%'
    });
  }
}
