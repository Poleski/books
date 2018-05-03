import { Directive, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SortableService } from './sortable.service';

@Directive({
    selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

    constructor(private sortService: SortableService) {}

    @Output()
    sorted = new EventEmitter();

    private columnSortedSubscription: Subscription;

    ngOnInit() {
        // subscribe to sort changes so we emit an event for this data table
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}
