import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDescriptionComponent } from './service-description.component';
import { ModalComponent } from 'src/app/_modal/modal.component';
import { UpdateServiceFormComponent } from '../update-service-form/update-service-form.component';

describe('ServiceDescriptionComponent', () => {
  let component: ServiceDescriptionComponent;
  let fixture: ComponentFixture<ServiceDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        UpdateServiceFormComponent,
        ModalComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
