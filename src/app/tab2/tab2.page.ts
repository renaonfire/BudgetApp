import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
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
  isLoading = true;

  constructor(public modalCtrl: ModalController,
              private monthsSrv: MonthsService,
              private spendSrv: SpendService,
              private loadingCtrl: LoadingController
  ) {}

  spendClicked() {
      this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          'list': true,
          'title': 'Spend Summary'
        }
      }).then(modalEl => {
        modalEl.present();
      })
  }

  budgetClicked() {
    this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'grid': true,
        'label': 'Set Budget',
        'title': 'Budget'
      }
    }).then(modalEl => {
      modalEl.present();
    })
  }

  getMonth() {
    return this.monthsSrv.getMonth();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.budgetSub = this.spendSrv.budgetChanged.subscribe(budget => {
      this.budget = budget
      this.isLoading = false;
    });
    this.sumOfSpendSub = this.spendSrv.sumChanged.subscribe(spend => {
      this.spend = spend;
      this.isLoading = false;
    });
    this.remainderSub = this.spendSrv.remainderChanged.subscribe(remainder => {
      this.remainder = remainder;
      this.isLoading = false;
    })
    this.spendSrv.getBudget();
    this.spendSrv.getSumOfSpend(this.getMonth());
  }

  // TODO add NgOnDestroy

}
