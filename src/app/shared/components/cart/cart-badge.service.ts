import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class CartBadgeService {

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    reload() {
        this.change.emit(true);
    }

}