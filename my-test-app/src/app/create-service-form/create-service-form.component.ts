import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Service } from '../models/service';

@Component({
  selector: 'app-create-service-form',
  templateUrl: './create-service-form.component.html',
  styleUrls: ['./create-service-form.component.css']
})
export class CreateServiceFormComponent implements OnInit {

  createServiceForm !: FormGroup

  @Input()
  newService = new Service()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service : AppServiceService) { }

  ngOnInit(): void {
    this.createServiceForm = new FormGroup({
      veh_title: new FormControl(this.newService.title, [Validators.minLength(3), Validators.required]),
      veh_description: new FormControl(this.newService.description, [Validators.minLength(3), Validators.required])
    })
  }

  handleCreate() {
    var today = new Date()
    var todayString = String(today.getFullYear()) + '-' + String(today.getMonth()+1) + '-' + String(today.getDate())
​
    const input = this.createServiceForm.value
    const anotherNewService = new Service({
      _id: input.veh__id,
      title: input.veh_title,
      description: input.veh_description,
      dateAdded: todayString,
      lastModified: '',
      user: ''
    })
    this.service.registerService(anotherNewService).subscribe(
      data => console.log('Success!', data),
      error => console.error('error!', error)
    )
    console.log(anotherNewService)

    this.handleClear()

    this.emitter.emit()
  }

  handleClear() {
    this.createServiceForm.controls.veh_title.reset();
    this.createServiceForm.controls.veh_description.reset();
  }
}
