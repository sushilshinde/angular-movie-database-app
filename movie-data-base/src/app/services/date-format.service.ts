import { Injectable, Inject, LOCALE_ID } from '@angular/core'
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DateFormatService {
    constructor(@Inject(LOCALE_ID) public locale: string) {}

    fomatDate(date: string) {
        return formatDate(date, 'MMMM dd, YYYY', this.locale)
    }

    formatDateWithTime(date: string) {
        return formatDate(date, 'MMMM dd, YYYY @ hh:mm a', this.locale)
    }
}