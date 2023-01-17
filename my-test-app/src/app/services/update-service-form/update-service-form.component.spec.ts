import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UpdateServiceFormComponent } from './update-service-form.component';

describe('UpdateServiceFormComponent', () => {
  let component: UpdateServiceFormComponent;
  let fixture: ComponentFixture<UpdateServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ UpdateServiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
