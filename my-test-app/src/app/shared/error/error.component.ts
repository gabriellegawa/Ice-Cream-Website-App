import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit{

  ngOnInit(): void {
    
  }

  constructor(private router:Router, private storageService:StorageService) {}

  redirectToHome() {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(["service-gallery"])
    }
    else {
      this.router.navigate(["user-login-form"])
    }
    
  }
}
