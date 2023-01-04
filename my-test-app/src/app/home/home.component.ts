import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  

  allRoutes:String[] = ['/', '/service-gallery', '/product-gallery', '/user-gallery', '/user-login-form', '/user-logout', '/user-gallery']
  exists:boolean = false

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  routeExists() {
    for (let route of this.allRoutes) {
      if (this.router.url == route) {
        return true
      }
    }
    return false
  }

}
