import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent implements OnInit {

  userList:User[] = []
  userToEdit?:User
  constructor(private service : AppServiceService) { }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList(){
    this.service.getUserList().subscribe((Response) => {
      this.userList = Response;
      console.log('Response from API', Response)
    }, (error)=> {
      console.error('error',Response)
    })
  }

  editUser(u:User){
    console.log(u)
    this.userToEdit=u
  }

  commitEdit(u:User){
    //Commit to the database

    this.ngOnInit();

    this.userToEdit=undefined
  }

  onCancel(){
    
    this.userToEdit=undefined
  }
}
