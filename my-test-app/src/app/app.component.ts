import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "my-test-app"

  constructor(public router: Router, private storageService:StorageService) {}

  ngOnInit() {
    this.redirect()
  }

  redirect() {

    if (this.router.url == "/") {
      this.router.navigate(['user-login-form'])
      return true
    }
    else {
      return false
    }
  }
}
