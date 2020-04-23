import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ISpend } from '../interfaces/spend.interface';
import { MonthsService } from '../services/months.service';

@Component({
    selector: 'modal-page',
    templateUrl: 'modal.html',
    styleUrls: ['modal.scss']
})
export class ModalPage implements OnInit {
    spend: ISpend[];
    months = this.monthsSrv.months;

    @Input() grid?: boolean;
    @Input() list?: boolean
    @Input() label?: string;
    @Input() title?: string;
    @ViewChild('value', {read: '', static: false}) value;
    @ViewChild('retrievedItem', {read: '', static: false}) retrievedItem;
    @ViewChild('monthValue', {read: '', static: false}) monthValue;

    constructor(public modalCtrl: ModalController,
                private monthsSrv: MonthsService
        
        ) { 
    }   

    getCurrentMonth() {
        return this.monthsSrv.getMonth();
    }

    // TODO add to service
    getSpend(month: any) {
        console.log('month from get spend ', month);
        this.spend = [];
        let results = [];
        let result;
        let promise = new Promise((resolve, reject) => {
            firebase.database().ref('spend').child(month).once('value').then((snapshots) => {
                if (snapshots.val()) {
                    results.push(Object.keys(snapshots.val()));
                    result = results[0];
                    resolve(result);
                } else {
                    this.label = 'No Entries';
                }
                });
        })
        promise.then((values: []) => {
            values.map((id: string) => (
                firebase.database().ref('spend').child(month).child(id).once('value').then((snapshots) => {
                    this.spend.push({id: id, data: {amount: (snapshots.val().amount), date: (snapshots.val().date)}});
                    })
                ));
        });
    }

    getCurrentMonthSpend() {
        let currentMonth = this.getCurrentMonth()
        this.getSpend(currentMonth);
    }

    getEnteredMonth (value: any) {
        return this.monthsSrv.getEnteredMonth(value);
    }

    monthChanged(value: any) {
        setTimeout(() => {
            console.log('month changed ran ');
            let newMonth = this.getEnteredMonth(value);
            this.getSpend(newMonth);
        }, 0);
    }

    // TODO add to service
    getValue() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('budget').once('value').then((snapshots) => {
                if (snapshots.val()) {
                    this.value = (snapshots.val());
                    resolve(this.value);
                } else {
                    this.value = 0;
                }
            });
        })
    }

    closeModal() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

    // TODO rename func
    dismiss() {
        if (this.value) {
            firebase.database().ref('budget').set(this.value);
            this.modalCtrl.dismiss({
                'dismissed': true
            });
        } else {
            // TODO add native alert
            return alert('Please enter value');
        }
        location.reload();
    }

    // TODO add to service
    onDeleteIconClick(itemId) {
        let selectedMonth = this.monthValue ? this.getEnteredMonth(this.monthValue) : this.getCurrentMonth();
        firebase.database().ref('spend').child(selectedMonth).child(itemId).remove();
        this.getSpend(selectedMonth);
    }

    ngOnInit() {
        this.list ? this.getCurrentMonthSpend() : this.getValue();
    }



}