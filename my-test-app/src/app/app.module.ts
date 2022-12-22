import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './_modal';

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
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserGalleryComponent } from './user-gallery/user-gallery.component';
import { UserDescriptionComponent } from './user-description/user-description.component';

const routes: Routes = [
  { path: '', redirectTo: 'service-gallery', pathMatch: 'full'},
  { path: 'user-login-form', component: UserLoginFormComponent},
  { path: 'service-gallery', component: ServiceGalleryComponent},
  { path: 'product-gallery', component: ProductGalleryComponent},
  { path: 'user-logout', component: ProductGalleryComponent}
]

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
    UserDescriptionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }