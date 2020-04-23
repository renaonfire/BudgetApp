import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import * as firebase from 'firebase';
import { MonthsService } from '../services/months.service';
import { ISumOfSpend } from '../interfaces/spend.interface';
import { Subscription } from 'rxjs';
import { SpendService } from '../services/spend.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  budget: ISumOfSpend["budget"] = 0;
  budgetSub = new Subscription;

  constructor(public modalCtrl: ModalController,
              private monthsSrv: MonthsService,
              private spendSrv: SpendService
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
    return this.spendSrv.getBudget();
}

  ionViewWillEnter() {
    this.ngOnInit();
  }
  
  ngOnInit() {
    this.getBudget();
    this.budgetSub = this.spendSrv.budgetChanged.subscribe(budget => {
      this.budget = budget;
    })
  }

}
