import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateFormat implements PipeTransform{
    constructor(@Inject(LOCALE_ID) public locale: string) {}
    transform(date: string | undefined, format: string) {
        if(format === 'simple') {
            return formatDate(date || '', 'MMMM dd, YYYY', this.locale)
        }else if(format === 'with_time') {
            return formatDate(date ||'', 'MMMM dd, YYYY @ hh:mm a', this.locale)
        }
        return Date.now().toString()
    }
}