import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../../app-service.service';
import { Service } from '../../models/service'
import { ModalService } from '../../_modal';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-service-gallery',
  templateUrl: './service-gallery.component.html',
  styleUrls: ['./service-gallery.component.scss']
})
export class ServiceGalleryComponent implements OnInit {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});


  serviceList:Service[] = []
  serviceToEdit?:Service

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private newService : AppServiceService, public modalService:ModalService, private storageService:StorageService, private router:Router) { }

  ngOnInit(): void {
    // if (!this.storageService.isLoggedIn()) {
    //   this.router.navigate(["user-login-form"])
    // }
    // else {
      this.getServiceList()
    // }
    this.slides[0] = {
      src: './assets/img/test1.jpg',
    };
    this.slides[1] = {
      src: './assets/img/test2.jpg',
    }
    this.slides[2] = {
      src: './assets/img/test1.jpg',
    }
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  refresh(): void {
    window.location.reload();
  }

  getServiceList() {
    this.newService.getServiceList().subscribe((Response) => {
      this.serviceList = Response
      console.log('Response from API', Response)
    }, (error) => {
      console.error('error', Response)
    })
  }

  editService(u:Service) {
    this.serviceToEdit = u
  }

  commitEdit(u:Service) {
    this.ngOnInit()

    this.serviceToEdit = undefined
  }

  deleteService(u:Service) {
    this.newService.deleteService(u).subscribe(
      data => console.log('Success!', data),
      error => console.error('error!', error)
    )
    
    this.refresh()

    this.emitter.emit()
  }

  onCancel() {
    this.serviceToEdit = undefined
  }

  String(number : number) {
    return String(number)
  }
}
