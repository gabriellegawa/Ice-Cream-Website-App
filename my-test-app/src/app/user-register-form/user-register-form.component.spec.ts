import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterFormComponent } from './user-register-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserRegisterFormComponent', () => {
  let component: UserRegisterFormComponent;
  let fixture: ComponentFixture<UserRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserRegisterFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
