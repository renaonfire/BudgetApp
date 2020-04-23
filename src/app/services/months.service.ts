import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthsService {

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  

  constructor() { }

  getMonth() {
    const date = new Date();
    const month = date.getMonth();
    return this.months[month];
  }

  getEnteredMonth (value: any) {
    const date = new Date(value);
    const month = date.getMonth();
    return this.months[month];
}
}
