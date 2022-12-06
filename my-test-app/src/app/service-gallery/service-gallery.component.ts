import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Service } from '../models/service'

@Component({
  selector: 'app-service-gallery',
  templateUrl: './service-gallery.component.html',
  styleUrls: ['./service-gallery.component.css']
})
export class ServiceGalleryComponent implements OnInit {

  serviceList:Service[] = []
  serviceToEdit?:Service

  constructor(private newService : AppServiceService) { }

  ngOnInit(): void {
    this.getServiceList()
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

  onCancel() {
    this.serviceToEdit = undefined
  }

  div1:boolean = true
  div2:boolean = false

  hideComponent() {
    this.div1 = false
    this.div2 = true
  }

  showComponent() {
    this.div1 = true
    this.div2 = false
  }
}
