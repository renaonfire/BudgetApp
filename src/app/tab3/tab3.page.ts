import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import * as firebase from 'firebase';
import { MonthsService } from '../services/months.service';
import { ISumOfSpend } from '../interfaces/spend.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  budget: ISumOfSpend["budget"] = 0;

  constructor(public modalCtrl: ModalController,
              private monthsSrv: MonthsService
    ) {}

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
    return this.monthsSrv.getMonth();
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
    this.ngOnInit();
  }
  
  ngOnInit() {
    this.getBudget();
  }

}
