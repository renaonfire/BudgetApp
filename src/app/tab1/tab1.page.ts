import { Component, Input, ViewChild } from '@angular/core';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  @Input() date = new Date();
  @ViewChild('cash', {read: '', static: false}) cash;
  @ViewChild('enteredDate', {read: '', static: false}) enteredDate;

  constructor(private router: Router) {
  }

  getTodaysDate(): string {
    const date = new Date();
    const newDate = new Intl.DateTimeFormat('en-GB').format(date);
    return newDate;
  }

  getEnteredDate() {
    if (this.enteredDate) {
    const date = new Date(this.enteredDate);
    const newDate = new Intl.DateTimeFormat('en-GB').format(date);
      return newDate;
    } else {
      return this.getTodaysDate();
    }
  }

  onAdd() {
    const spend = {
      date: this.getEnteredDate(),
      amount: this.cash
    };
    if (this.cash) {
      firestore().collection('spend').add(spend);
    } else {
      return alert('Please enter value');
    }
    this.router.navigate(['tabs/tab2']);
  }
}
