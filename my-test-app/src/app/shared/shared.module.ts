import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import { ErrorComponent } from './error/error.component'
import { CarouselComponent } from './components/carousel/carousel.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component'

@NgModule({
    declarations: [ErrorComponent, CarouselComponent, UnauthorizedComponent],
    imports: [CommonModule],
})

export class SharedModule {}