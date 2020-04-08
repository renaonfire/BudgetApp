import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

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

  getMonth() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date(this.getEnteredDate());
    const month = date.getDate();
    return months[month - 1];
  }

  onAdd() {
    const spend = {
      date: this.getEnteredDate(),
      amount: this.cash
    };
    if (this.cash) {
      let newKey = firebase.database().ref('spend').child(this.getMonth()).push().key;
      firebase.database().ref('spend').child(this.getMonth()).child(newKey).set(spend);
    } else {
      return alert('Please enter value');
    }
    this.router.navigate(['tabs/tab2']);
  }
}
