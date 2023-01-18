import { ComponentFixture, fakeAsync, TestBed, tick, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLoginFormComponent } from './user-login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { of } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { AppRoutingModule } from '../app-routing.module';
import { throwError } from 'rxjs'
import { Router } from '@angular/router';

describe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;
  let loginButton:HTMLButtonElement
  let authService:AuthService
  let storageService:StorageService
  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
      ],
      declarations: [ UserLoginFormComponent ],
      providers: [ AuthService, StorageService, Router ]
    })
    .compileComponents();
  });

  beforeEach(inject([AuthService, StorageService, Router], (a: AuthService, s:StorageService, r:Router) => {
    authService = a
    storageService = s
    router = r
    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    loginButton = fixture.debugElement.nativeElement.querySelector("button")
    component.resetLogin()
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message on the website', fakeAsync(() => {
    spyOn(component, "handleLogin").and.callThrough()
    spyOn(authService, "login").and.returnValue(throwError(() => new Error("{status: 401}")))

    loginButton.click()

    tick()
    fixture.detectChanges()

    expect(component.isLoginFailed).toEqual(true)

    let error = fixture.debugElement.nativeElement.querySelectorAll("h1").item(1)?.textContent
    expect(error).toBe(" Invalid Email Address/Password combination ")
  }))
  
  it("should navigate to service gallery page", fakeAsync(() => {
    let response = {
      "idToken": "abcdefghijklmnopqrstuvwxyz",
      "expiresIn": 120,
      "firstName": "Budi",
      "lastName": "Setiawan",
      "email": "budisetiawan@gmail.com",
      "role": "Admin"
    }

    spyOn(component, "handleLogin").and.callThrough()
    spyOn(authService, "login").and.returnValue(of(response))
    spyOn(storageService, "setSession").and.callThrough()
    spyOn(router, "navigate").and.callThrough()

    loginButton.click()

    tick()
    fixture.detectChanges()

    expect(localStorage.getItem("id_token")).toBeTruthy()
    expect(component.isLoggedIn).toBe(true)
    expect(router.url).toBe("/service-gallery")

  }))

  it("should call handleLogin method", fakeAsync(() => {   
    spyOn(component, "handleLogin")

    loginButton.click()

    tick()
    fixture.detectChanges()

    expect(component.handleLogin).toHaveBeenCalled()
  }))
});