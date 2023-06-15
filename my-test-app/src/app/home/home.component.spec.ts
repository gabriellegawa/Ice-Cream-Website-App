import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { HeaderAppComponent } from '../core/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserDescriptionComponent } from '../users/user-description/user-description.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../core/footer/footer.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        RouterModule,
      ],
      declarations: [
        HomeComponent,
        HeaderAppComponent,
        UserDescriptionComponent,
        FooterComponent,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
