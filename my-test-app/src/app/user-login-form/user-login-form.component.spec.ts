import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLoginFormComponent } from './user-login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ UserLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
