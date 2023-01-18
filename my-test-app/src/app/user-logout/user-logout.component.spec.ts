import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { StorageService } from '../_services/storage.service';

import { UserLogoutComponent } from './user-logout.component';

describe('UserLogoutComponent', () => {
  let component: UserLogoutComponent;
  let fixture: ComponentFixture<UserLogoutComponent>;
  let storageService: StorageService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppRoutingModule
      ],
      declarations: [ UserLogoutComponent ],
      providers: [ StorageService, Router ]
    })
    .compileComponents();
  });

  beforeEach(inject([StorageService, Router], (s:StorageService, r:Router) => {
    storageService = s
    router = r
    fixture = TestBed.createComponent(UserLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should clear data from storage service and navigate to user-login-form component", fakeAsync(() => {
    spyOn(component, "logout").and.callThrough()
    spyOn(storageService, "clean").and.callThrough()
    spyOn(router, "navigate").and.callThrough()

    let response = {
      "idToken": "abcdefghijklmnopqrstuvwxyz",
      "expiresIn": 120,
      "firstName": "Budi",
      "lastName": "Setiawan",
      "email": "budisetiawan@gmail.com",
      "role": "Admin"
    }

    storageService.setSession(response)
    component.logout()

    tick()
    fixture.detectChanges()
    expect(localStorage.length).toBe(0)

    expect(router.url).toBe("/user-login-form")

  }))
});
