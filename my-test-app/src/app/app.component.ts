import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "my-test-app"

  constructor(private router: Router, private storageService:StorageService, public authService:AuthService) {}

  ngOnInit() {
  }
}
