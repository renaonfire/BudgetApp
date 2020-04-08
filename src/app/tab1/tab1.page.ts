import { Component, Input, ViewChild } from '@angular/core';
import { firestore } from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  @Input() date = new Date();
  @ViewChild('cash', {read: '', static: false}) cash;
  @ViewChild('enteredDate', {read: '', static: false}) enteredDate;

  constructor() {
  }

  getDate(): string {
    const day = this.date.getDate();
    const month = this.date.getMonth() + 1;
    const year = this.date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getEnteredDate() {
    if (this.enteredDate) {
      return this.enteredDate;
    } else {
      return this.getDate();
    }
  }

  onAdd() {
    if (this.cash) {
      this.writeData(this.getEnteredDate(), this.cash);
    } else {
      return alert('Please enter value');
    }
  }

  writeData(date, value) {
    const spend = {
      amount: value
    };
    firestore().collection('date' + date).add(spend);
  }



}
