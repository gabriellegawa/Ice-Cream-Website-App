import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderAppComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  redirectToProductGallery() {
    this.router.navigate(['product-gallery'])
  }

  redirectToServiceGallery() {
    this.router.navigate(['service-gallery'])
  }
  // TODO: Move this command to the user logout component
  redirectToLogout() {
    this.storageService.clean()
    this.router.navigate(["user-login-form"])
    // this.router.navigate(["user-logout"])
  }

  isLoggedIn() {
    return this.storageService.isLoggedIn()
  }
}
