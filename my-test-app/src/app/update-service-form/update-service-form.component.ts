import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { NgForm } from '@angular/forms';
import { Service } from '../models/service';

@Component({
  selector: 'app-update-service-form',
  templateUrl: './update-service-form.component.html',
  styleUrls: ['./update-service-form.component.css']
})
export class UpdateServiceFormComponent implements OnInit {

  @Input()
  service = new Service()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private newService:AppServiceService) { }

  ngOnInit(): void {
  }

  handleUpdate(nForm:NgForm) {
    const input = nForm.value
    const val = new Service({
      _id: input.veh__id,
      title: input.veh_title,
      description: input.veh_description,
      dateAdded: input.veh_dateAdded,
      lastModified: input.veh_lastModified,
      user: input.veh_user
    })

    this.newService.updateService(val).subscribe(
      data => console.log('Success', data),
      error => console.log('Error', error)
    )
    
    console.log(val)

    this.emitter.emit()
  }

}
