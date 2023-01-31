import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from './_modal';

import { AppComponent } from './app.component';
import { ProductDescriptionComponent } from './products/product-description/product-description.component';
import { ProductGalleryComponent } from './products/product-gallery/product-gallery.component';

import { UpdateUserFormComponent } from './users/update-user-form/update-user-form.component';
import { CreateUserFormComponent } from './users/create-user-form/create-user-form.component';
import { UserGalleryComponent } from './users/user-gallery/user-gallery.component';
import { UserDescriptionComponent } from './users/user-description/user-description.component';

import { HeaderAppComponent } from './core/header/header.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';

import { ServiceDescriptionComponent } from './services/service-description/service-description.component';
import { UpdateServiceFormComponent } from './services/update-service-form/update-service-form.component';
import { ServiceGalleryComponent } from './services/service-gallery/service-gallery.component';
import { CreateServiceFormComponent } from './services/create-service-form/create-service-form.component';


import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { CarouselModule } from '@coreui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { ErrorComponent } from './shared/error/error.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';

import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    ProductDescriptionComponent,
    ProductGalleryComponent,
    UpdateUserFormComponent,
    CreateUserFormComponent,
    HeaderAppComponent,
    ServiceDescriptionComponent,
    UpdateServiceFormComponent,
    ServiceGalleryComponent,
    CreateServiceFormComponent,
    UserLoginFormComponent,
    UserLogoutComponent,
    UserGalleryComponent,
    UserDescriptionComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CarouselModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    AppRoutingModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [RouterModule],
  providers: [
    httpInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }