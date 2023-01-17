import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateUserFormComponent } from './update-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateUserFormComponent', () => {
  let component: UpdateUserFormComponent;
  let fixture: ComponentFixture<UpdateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ UpdateUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
