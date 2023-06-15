import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceGalleryComponent } from './service-gallery.component';
import { ModalComponent } from 'src/app/_modal/modal.component';
import { CreateServiceFormComponent } from '../create-service-form/create-service-form.component';

describe('ServiceGalleryComponent', () => {
  let component: ServiceGalleryComponent;
  let fixture: ComponentFixture<ServiceGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        ServiceGalleryComponent,
        ModalComponent,
        CreateServiceFormComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
