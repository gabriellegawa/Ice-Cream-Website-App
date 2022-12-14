import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceFormComponent } from './update-service-form.component';

describe('UpdateServiceFormComponent', () => {
  let component: UpdateServiceFormComponent;
  let fixture: ComponentFixture<UpdateServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
