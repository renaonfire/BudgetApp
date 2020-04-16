import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  budget: number = 0;

  constructor(public modalCtrl: ModalController) {}

  async budgetClicked() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'grid': 'true',
        'label': 'Set Budget',
        'title': 'Settings'
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

  getBudget() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('budget').once('value').then((snapshots) => {
          if (snapshots.val()) {
              this.budget = (snapshots.val());
              resolve(this.budget);
          } else {
              this.budget = 0;
          }
      });
  })
}

  ionViewWillEnter() {
    this.getBudget();
  }
  
  ngOnInit() {
    this.getBudget();
  }

}
