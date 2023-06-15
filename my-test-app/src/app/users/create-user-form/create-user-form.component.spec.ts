import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { CreateUserFormComponent } from './create-user-form.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppServiceService } from 'src/app/app-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderAppComponent } from 'src/app/core/header/header.component';
import { MatButtonModule } from '@angular/material/button';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;
  let button: HTMLButtonElement;

  const dialog = {
    close: () => { }
  }

  const setAllFormControlValues = () => {
    component.createUserForm.controls['veh_firstName'].setValue('John');
    component.createUserForm.controls['veh_lastName'].setValue('Doe');
    component.createUserForm.controls['veh_emailAddress'].setValue('john.doe@gmail.com');
    component.createUserForm.controls['veh_phoneNumber'].setValue('1234567890');
    component.createUserForm.controls['veh_dateOfBirth'].setValue('2000-01-01');
    component.createUserForm.controls['veh_password'].setValue('password');
    component.createUserForm.controls['veh_confirmPassword'].setValue('password');

    fixture.detectChanges();
  }

  const setFormControlValue = (formControlName: string, value: string) => {
    component.createUserForm.controls[formControlName].setValue(value);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [CreateUserFormComponent, HeaderAppComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        AppServiceService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Create User'`, fakeAsync(() => {
    tick();

    let title = fixture.debugElement.nativeElement.querySelectorAll("h1").item(0).textContent
    expect(title).toEqual('Create New User');
  }))

  it('should have a button with text "Create"', fakeAsync(() => {
    tick();

    let buttonText = button.textContent
    expect(buttonText).toEqual('Create User');
  }))

  it('should have a button with text "Cancel"', fakeAsync(() => {
    tick();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(1).textContent
    expect(button).toEqual('Cancel');
  }))

  it('should have a button with text "Create" and be initially disabled', fakeAsync(() => {
    tick();


    expect(button.disabled).toBeTruthy();
  }))

  it('should enable button when all fields are filled', fakeAsync(() => {

    setAllFormControlValues();

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeFalsy();
  }))

  it('should disable button when all fields are filled except first name', fakeAsync(() => {
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '2000-01-01');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeTruthy();
  }))

  it('should disable button when all fields are filled except last name', fakeAsync(() => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '2000-01-01');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeTruthy();
  }))

  it('should disable button when all fields are filled except email address', fakeAsync(() => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '2000-01-01');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeTruthy();
  }))

  it('should disable button when all fields are filled except phone number', fakeAsync(() => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_dateOfBirth', '2000-01-01');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeTruthy();
  }))

  it('should disable button when all fields are filled except dateOfBirth', fakeAsync(() => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeTruthy();
  }))

  it('should disable button when all fields are filled except password', fakeAsync(() => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '2000-01-01');
    setFormControlValue('veh_confirmPassword', 'password');

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeTruthy();
  }))

  it('should disable button when all fields are filled except confirmPassword', fakeAsync(() => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '2000-01-01');
    setFormControlValue('veh_password', 'password');

    tick();
    fixture.detectChanges();


    expect(button.disabled).toBeTruthy();
  }));

  it('should call registerUser service when all fields are filled and button is clicked', fakeAsync(inject([AppServiceService], (service: AppServiceService) => {
    spyOn(service, "registerUser");

    setAllFormControlValues();

    button.click();

    tick();
    fixture.detectChanges();

    expect(service.registerUser).toHaveBeenCalled();
  })))

  it('should call handleCreate when all fields are filled and button is clicked', fakeAsync(() => {
    spyOn(component, "handleCreate");

    setAllFormControlValues();

    button.click();

    tick();
    fixture.detectChanges();

    expect(component.handleCreate).toHaveBeenCalled();
  }));

  it('should call handleClear when all fields are filled and button is clicked', fakeAsync(() => {
    spyOn(component, "handleClear");

    setAllFormControlValues();

    button.click();

    tick();
    fixture.detectChanges();

    expect(component.handleClear).toHaveBeenCalled();
  }));
});
