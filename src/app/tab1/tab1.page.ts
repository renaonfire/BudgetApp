import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MonthsService } from '../services/months.service';
import { SpendService } from '../services/spend.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  @Input() date = new Date();
  @ViewChild('cash', {read: '', static: false}) cash;
  @ViewChild('enteredDate', {read: '', static: false}) enteredDate;

  constructor(private router: Router,
              private monthsSrv: MonthsService,
              private spendSrv: SpendService,
              private alertCtrl: AlertController
  ) {}

  getTodaysDate(): string {
    const date = new Date();
    const newDate = new Intl.DateTimeFormat('en-GB').format(date);
    return newDate;
  }

  getEnteredDate() {
    if (this.enteredDate) {
    const date = new Date(this.enteredDate);
      return date;
    } else {
      let todaysDate = new Date();
      return todaysDate;
    }
  }

  getMonth() {
    const months = this.monthsSrv.months
    const date = new Date(this.getEnteredDate());
    const month = date.getMonth();
    return months[month];
  }

  onAdd() {
    if (this.cash) {
      this.spendSrv.addSpend(this.getMonth(), this.getEnteredDate(), this.cash);
      this.router.navigate(['tabs/tab2']);
    } else {
      this.alertCtrl
      .create({
        header: 'No Value Entered',
        message: 'Please Enter an Amount',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel'
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
    }
  }
}
