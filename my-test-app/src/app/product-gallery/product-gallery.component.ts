import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { User } from '../models/user';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent implements OnInit {

  userList:User[] = []
  userToEdit?:User
  constructor(private service : AppServiceService, private storageService:StorageService, private router:Router) { }

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(["user-login-form"])
    }
    else {
      this.getUserList()
    }
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

    // console.log(u)
    window.location.reload();

    this.userToEdit=undefined
  }

  onCancel(){
    
    this.userToEdit=undefined
  }
}
