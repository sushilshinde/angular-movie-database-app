import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  data: string = '';

  sendData(text: string) {
    this.data = text;
  }
  getData() {
    return this.data;
  }
}
