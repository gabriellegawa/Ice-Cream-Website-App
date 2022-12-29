import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/models/service';
import { AppServiceService } from '../../app-service.service';
import { ModalService } from '../../_modal';

@Component({
  selector: 'app-service-description',
  templateUrl: './service-description.component.html',
  styleUrls: ['./service-description.component.scss']
})
export class ServiceDescriptionComponent implements OnInit {

  @Input()
  currentService: Service = new Service()
  @Input()
  currentIndex: number = 0

  @Output("on-submit")
  emitter = new EventEmitter
  serviceToEdit?:Service

  constructor(private newService : AppServiceService, public modalService:ModalService) { }

  ngOnInit(): void {
    console.log(this.currentIndex + ' ' +this.currentService._id)
  }

  editService(u:Service) {
    this.serviceToEdit = u
  }

  commitEdit(u:Service) {
    this.ngOnInit()

    this.refresh()
    
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

  refresh(): void {
    window.location.reload();
  }
}
