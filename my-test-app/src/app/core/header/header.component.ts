import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderAppComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService, public auth:AuthService) { }

  ngOnInit(): void {
  }

  getRole() {
    return localStorage.getItem('role')
  }

  redirectToProductGallery() {
    this.router.navigate(['product-gallery'])
  }

  redirectToUserGallery() {
    this.router.navigate(['user-gallery'])
  }

  redirectToServiceGallery() {
    this.router.navigate(['service-gallery'])
  }

  redirectToLogin() {
    this.router.navigate(['user-login-form'])
  }
  
  // TODO: Move this command to the user logout component
  redirectToLogout() {
    this.router.navigate(["user-logout"])
  }

  isLoggedIn() {
    return this.storageService.isLoggedIn()
  }
}
