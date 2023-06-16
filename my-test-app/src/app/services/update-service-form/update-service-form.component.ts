import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../models/service';

@Component({
  selector: 'app-update-service-form',
  templateUrl: './update-service-form.component.html',
  styleUrls: ['./update-service-form.component.scss']
})
export class UpdateServiceFormComponent implements OnInit {

  updateServiceForm !: FormGroup

  @Input()
  service = new Service()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {
    this.updateServiceForm = new FormGroup({
      veh_title: new FormControl(this.service.title, [Validators.minLength(3), Validators.required]),
      veh_description: new FormControl(this.service.description, [Validators.minLength(3), Validators.required]),
      veh_img_name: new FormControl(this.service.imgPath, [Validators.minLength(3), Validators.required])
    })
  }

  handleUpdate() {
    var today = new Date()
    var todayString = String(today.getFullYear()) + '-' + String(today.getMonth() + 1) + '-' + String(today.getDate())

    const input = this.updateServiceForm.value
    const val = new Service({
      _id: this.service._id,
      title: input.veh_title,
      description: input.veh_description,
      dateAdded: this.service.dateAdded,
      lastModified: todayString
    })

    this.appService.updateService(val).subscribe(
      data => console.log('Success', data),
      error => console.log('Error', error)
    )


    this.emitter.emit()
  }

}
