import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import { ErrorComponent } from './error/error.component'
import { CarouselComponent } from './components/carousel/carousel.component'

@NgModule({
    declarations: [ErrorComponent, CarouselComponent],
    imports: [CommonModule],
})

export class SharedModule {}