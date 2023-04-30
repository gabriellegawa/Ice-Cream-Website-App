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

  slides: any[] = [];
  filtersLoaded: Promise<boolean> = Promise.resolve(false);

  serviceList:Service[] = []
  serviceToEdit?:Service

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private newService : AppServiceService, public modalService:ModalService, private storageService:StorageService, private router:Router) { }

  ngOnInit(): void {
    this.getServiceList()
  }

  refresh(): void {
    window.location.reload();
  }

  async getServiceList() {

    const response = await this.newService.getServiceList().subscribe((Response) => {
      this.serviceList = Response
      this.filtersLoaded = Promise.resolve(true)
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

  getRole() {
    return localStorage.getItem('role')
  }
}
