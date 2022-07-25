import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[app-carouselItem]'
})
export class CarouselItemDirective {

    constructor(public tpl: TemplateRef<any>) {
    }

}
