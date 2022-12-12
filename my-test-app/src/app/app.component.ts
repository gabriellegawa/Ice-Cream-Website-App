import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "my-test-app"

  constructor(public router: Router) {}

  ngOnInit() {
    console.log(this.redirect())
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
