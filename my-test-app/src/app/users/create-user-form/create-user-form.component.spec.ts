import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserFormComponent } from './create-user-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;

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
});
