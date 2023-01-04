import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  

  allRoutes:String[] = ['/service-gallery', '/product-gallery', '/user-gallery', '/user-login-form', '/user-logout', '/user-gallery']
  exist:boolean = false

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  checkCurrentRoute() {
    for (const route in this.allRoutes) {
      if (this.router.url == route) {
        this.exist = true
      }
    }
  }

}
