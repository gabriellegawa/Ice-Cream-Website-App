import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ServiceGalleryComponent } from 'src/app/service-gallery/service-gallery.component'
import { UserLoginFormComponent } from 'src/app/user-login-form/user-login-form.component'

const routes: Routes = [
    { path: '', redirectTo: 'user-login-form', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}