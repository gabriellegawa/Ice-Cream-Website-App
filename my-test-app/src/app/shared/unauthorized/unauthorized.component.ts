import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {

  constructor(private router: Router, private storageService: StorageService) { }

  redirectToHome() {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(["service-gallery"])
    }
    else {
      this.router.navigate(["user-login-form"])
    }

  }
}
