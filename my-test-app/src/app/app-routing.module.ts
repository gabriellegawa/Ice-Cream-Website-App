import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ServiceGalleryComponent } from './services/service-gallery/service-gallery.component'
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'
import { ProductGalleryComponent } from './products/product-gallery/product-gallery.component'
import { UserGalleryComponent } from './users/user-gallery/user-gallery.component'
import { ErrorComponent } from './shared/error/error.component'
import { AuthGuard } from './_helpers/auth.guard'
import { Role } from './models/role'
import { StorageService } from './_services/storage.service'

var defaultPath = ''
var storageService = new StorageService()

if (storageService.isLoggedIn()) {
    defaultPath = 'service-gallery'
}
else {
    defaultPath = 'user-login-form'
}

const routes: Routes = [
    { path: '', redirectTo: defaultPath, pathMatch: 'full'},
    { path: 'user-login-form', component: UserLoginFormComponent},
    { path: 'service-gallery', component: ServiceGalleryComponent},
    { path: 'product-gallery', component: ProductGalleryComponent},
    { path: 'user-gallery', component: UserGalleryComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    { path: '**', component: ErrorComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}