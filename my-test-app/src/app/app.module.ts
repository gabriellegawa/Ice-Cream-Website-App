import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { ServiceDescriptionComponent } from './service-description/service-description.component';
import { UpdateServiceFormComponent } from './update-service-form/update-service-form.component';
import { ServiceGalleryComponent } from './service-gallery/service-gallery.component';
import { CreateServiceFormComponent } from './create-service-form/create-service-form.component';

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
    CreateServiceFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
