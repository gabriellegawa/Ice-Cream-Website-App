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

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }
}
