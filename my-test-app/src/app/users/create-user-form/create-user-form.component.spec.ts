import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserFormComponent } from './create-user-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;


  const setAllFormControlValues = () => {
    component.createUserForm.controls['veh_firstName'].setValue('John');
    component.createUserForm.controls['veh_lastName'].setValue('Doe');
    component.createUserForm.controls['veh_emailAddress'].setValue('john.doe@gmail.com');
    component.createUserForm.controls['veh_phoneNumber'].setValue('1234567890');
    component.createUserForm.controls['veh_dateOfBirth'].setValue('01/01/2000');
    component.createUserForm.controls['veh_password'].setValue('password');
    component.createUserForm.controls['veh_confirmPassword'].setValue('password');

    fixture.detectChanges();
  }

  const setFormControlValue = (formControlName: string, value: string) => {
    component.createUserForm.controls[formControlName].setValue(value);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreateUserFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Create User'`, () => {
    let title = fixture.debugElement.nativeElement.querySelectorAll("h1").item(0).textContent
    expect(title).toEqual('Create New User');
  })

  it('should have a button with text "Create"', () => {
    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0).textContent
    expect(button).toEqual('Create User');
  })

  it('should have a button with text "Cancel"', () => {
    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(1).textContent
    expect(button).toEqual('Cancel');
  })

  it('should have a button with text "Create" and be initially disabled', () => {
    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })

  it('should enable button when all fields are filled', () => {

    setAllFormControlValues();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeFalsy();
  })

  it('should disable button when all fields are filled except first name', () => {
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '01/01/2000');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })

  it('should disable button when all fields are filled except last name', () => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '01/01/2000');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');


    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })

  it('should disable button when all fields are filled except email address', () => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '01/01/2000');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })

  it('should disable button when all fields are filled except phone number', () => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_dateOfBirth', '01/01/2000');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })

  it('should disable button when all fields are filled except dateOfBirth', () => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_password', 'password');
    setFormControlValue('veh_confirmPassword', 'password');

    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })

  it('should disable button when all fields are filled except password', () => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '01/01/2000');
    setFormControlValue('veh_confirmPassword', 'password');

    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })

  it('should disable button when all fields are filled except confirmPassword', () => {
    setFormControlValue('veh_firstName', 'John');
    setFormControlValue('veh_lastName', 'Doe');
    setFormControlValue('veh_emailAddress', 'john.doe@gmail.com');
    setFormControlValue('veh_phoneNumber', '1234567890');
    setFormControlValue('veh_dateOfBirth', '01/01/2000');
    setFormControlValue('veh_password', 'password');

    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelectorAll("button").item(0)
    expect(button.disabled).toBeTruthy();
  })
});
