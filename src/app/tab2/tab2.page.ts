import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  spend: any = 0
  budget: any = 0
  remainder: any = 0

  constructor(public modalCtrl: ModalController) {}

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
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date();
    const month = date.getMonth();
    return months[month];
  }

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
    this.getSumOfSpend();
    this.getBudget();
  }

}
