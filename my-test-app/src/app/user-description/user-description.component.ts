import { Component, OnInit, Input } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { User } from '../models/user'

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.css']
})
export class UserDescriptionComponent implements OnInit {

  @Input()
  user = new User();

  userList:User[] = [];
  currentDate = new Date();
  testName = 'Nathan';

  productForm = new FormGroup({
    productName: new FormControl(),
    date: new FormControl()
  })
  constructor(private service : AppServiceService, private appService : AppServiceService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.service.getData().subscribe((Response) => {
      console.log('Response from API', Response)
    }, (error)=> {
      console.error('error',Response)
    })
  }

  

  onSubmit() {
    console.log(this.productForm.value);
    this.appService.registerProduct(this.productForm.value).subscribe(
      data => console.log('Success!', data),
      error => console.error('error!', error)
    )
  }
}
