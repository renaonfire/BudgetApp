import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { MonthsService } from '../services/months.service';
import { Subscription } from 'rxjs';
import { ISumOfSpend } from '../interfaces/spend.interface';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  spend: ISumOfSpend['spend'] = 0;
  budget: ISumOfSpend['budget'] = 0;
  remainder: ISumOfSpend['remainder'] = 0;
  sumOfSpendSub: Subscription;

  constructor(public modalCtrl: ModalController,
              private monthsSrv: MonthsService
  ) {}

  async spendClicked() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'list': true,
        'title': 'Spend Summary'
      }
    });
    return await modal.present();
  }

  async budgetClicked() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'grid': true,
        'label': 'Set Budget',
        'title': 'Budget'
      }
    });
    return await modal.present();
  }

  getMonth() {
    return this.monthsSrv.getMonth();
  }

  // TODO add to service 
  getSumOfSpend() {
    let results = [];
    let result;
    let value = [];
    let sum;
    let currentMonth = this.getMonth();
    let promise = new Promise((resolve, reject) => {
        firebase.database().ref('spend').child(currentMonth).once('value').then((snapshots) => {
          if (snapshots.val()) {
            results.push(Object.keys(snapshots.val()));
            result = results[0];
            resolve(result);
          } else {
            this.spend = 0;
          }
        });
    })
    promise.then((values: []) => {
        values.map((id: string) => (
            firebase.database().ref('spend').child(currentMonth).child(id).once('value').then((snapshots) => {
                value.push(snapshots.val().amount) as number;
                sum = value.reduce((a, b) => a + b) as number;
                this.spend = sum;
                this.remainder = this.budget - this.spend;
                })
            ));
    });
}

  // TODO add to service
  getBudget() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('budget').once('value').then((snapshots) => {
          if (snapshots.val()) {
              this.budget = (snapshots.val());
              resolve([this.budget, this.remainder]);
          } else {
              this.budget = 0;
          }
      });
  })
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    // TODO add when service working
    // this.sumOfSpendSub = this.spendSrv.sumChanged.subscribe(data => {
    //   this.spend.spend = data.spend;
    //   this.spend.remainder = data.remainder;
    //   this.spend.budget = data.budget});
    // this.spendSrv.getSumOfSpend(this.getMonth());
    
    this.getSumOfSpend();
    this.getBudget();
  }

}
