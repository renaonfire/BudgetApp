import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { MonthsService } from '../services/months.service';
import { Subscription } from 'rxjs';
import { ISumOfSpend } from '../interfaces/spend.interface';
import { SpendService } from '../services/spend.service';


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
  budgetSub: Subscription;
  remainderSub: Subscription;

  constructor(public modalCtrl: ModalController,
              private monthsSrv: MonthsService,
              private spendSrv: SpendService
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

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    // TODO add when service working
    this.budgetSub = this.spendSrv.budgetChanged.subscribe(budget => {
      this.budget = budget
    });
    this.sumOfSpendSub = this.spendSrv.sumChanged.subscribe(spend => {
      this.spend = spend;
    });
    this.remainderSub = this.spendSrv.remainderChanged.subscribe(remainder => {
      this.remainder = remainder;
    })
    this.spendSrv.getBudget();
    this.spendSrv.getSumOfSpend(this.getMonth());
  }

}
