import { empty } from '@angular-devkit/schematics';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SrvRecord } from 'dns';
import { read } from 'fs';
import { Image } from 'src/app/models/image';
import { AppServiceService } from '../../app-service.service';
import { Service } from '../../models/service';

@Component({
  selector: 'app-create-service-form',
  templateUrl: './create-service-form.component.html',
  styleUrls: ['./create-service-form.component.scss']
})
export class CreateServiceFormComponent implements OnInit {

  createServiceForm !: FormGroup

  uploadedImage : Image = new Image()
  url:string= ''

  @Input()
  newService = new Service()

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
    this.createServiceForm = new FormGroup({
      veh_title: new FormControl(this.newService.title, [Validators.minLength(3), Validators.required]),
      veh_description: new FormControl(this.newService.description, [Validators.minLength(3), Validators.required]),
      veh_shortDescription: new FormControl(this.newService.image?.shortDescription),
      veh_image: new FormControl(this.newService.image?.imagePath)
    })
  }

  refresh(): void {
    window.location.reload();
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
      containsImage: true,
      image: this.uploadedImage
    })

    console.log(anotherNewService)
    this.service.registerService(anotherNewService).subscribe(
      data => console.log('Success!', data),
      error => console.error('error!', error)
    )

    this.handleClear()
    
    // this.refresh()

    this.emitter.emit()
  }

  handleClear() {
    this.createServiceForm.controls.veh_title.reset();
    this.createServiceForm.controls.veh_description.reset();
    this.createServiceForm.controls.veh_image.reset();
  }

  handleFileInput(event: Event) {

    var element = event.currentTarget as HTMLInputElement;
    var fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);

      var file: File = fileList[0];
      var reader = new FileReader();

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result as string;

        this.uploadedImage.base64 = reader.result as string 
        this.uploadedImage.imagePath = file.name
      
      }


      reader.readAsDataURL(file);

    }
    
  }
}
