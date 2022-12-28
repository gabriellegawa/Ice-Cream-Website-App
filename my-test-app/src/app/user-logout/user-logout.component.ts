import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  constructor(private storageService: StorageService, private router:Router) { }

  ngOnInit(): void {
    console.log("here")
    this.storageService.clean()
    this.router.navigate(["user-login-form"])
  }

}
