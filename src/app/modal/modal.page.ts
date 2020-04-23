import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ISpend } from '../interfaces/spend.interface';
import { MonthsService } from '../services/months.service';
import { SpendService } from '../services/spend.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'modal-page',
    templateUrl: 'modal.html',
    styleUrls: ['modal.scss']
})
export class ModalPage implements OnInit {
    spend: ISpend[];
    months = this.monthsSrv.months;
    spendListSub = new Subscription;
    budgetSub = new Subscription;

    @Input() grid?: boolean;
    @Input() list?: boolean
    @Input() label?: string;
    @Input() title?: string;
    @ViewChild('value', {read: '', static: false}) value;
    @ViewChild('retrievedItem', {read: '', static: false}) retrievedItem;
    @ViewChild('monthValue', {read: '', static: false}) monthValue;

    constructor(public modalCtrl: ModalController,
                private monthsSrv: MonthsService,
                private spendSrv: SpendService,
                private alertCtrl: AlertController
        
        ) { 
    }   

    getCurrentMonth() {
        return this.monthsSrv.getMonth();
    }

    // TODO add error handling
    getCurrentMonthSpend() {
        let currentMonth = this.getCurrentMonth();
        this.spendSrv.getSpendList(currentMonth);
    }

    getEnteredMonth (value: any) {
        return this.monthsSrv.getEnteredMonth(value);
    }

    monthChanged(value: any) {
        setTimeout(() => {
            console.log('month changed ran ');
            let newMonth = this.getEnteredMonth(value);
            this.spendSrv.getSpendList(newMonth);
        }, 0);
    }

    getBudget() {
        return this.spendSrv.getBudget();
    }

    closeModal() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

    onSaveBudget() {
        if (this.value) {
            this.spendSrv.addBudget(this.value);
            this.modalCtrl.dismiss({
                'dismissed': true
            });
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

    // TODO add to service
    onDeleteIconClick(itemId) {
        let selectedMonth = this.monthValue ? this.getEnteredMonth(this.monthValue) : this.getCurrentMonth();
        firebase.database().ref('spend').child(selectedMonth).child(itemId).remove();
        this.spendSrv.getSpendList(selectedMonth);
    }

    ngOnInit() {
        this.list ? this.getCurrentMonthSpend() : this.getBudget();
        this.spendListSub = this.spendSrv.spendListUpdated.subscribe(spend => {
            this.spend = spend;
        })
        this.budgetSub = this.spendSrv.budgetChanged.subscribe(budget => {
            this.value = budget;
        })
    }



}