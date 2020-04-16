import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ISpend } from '../interfaces/spend.interface';

@Component({
    selector: 'modal-page',
    templateUrl: 'modal.html',
    styleUrls: ['modal.scss']
})
export class ModalPage implements OnInit {
    spend: ISpend[];

    @Input() grid?: boolean;
    @Input() list?: boolean
    @Input() label?: string;
    @Input() title?: string;
    @ViewChild('value', {read: '', static: false}) value;
    @ViewChild('retrievedItem', {read: '', static: false}) retrievedItem;

    constructor(public modalCtrl: ModalController) {
        this.spend = [];
    }   

    getMonth() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const date = new Date();
        const month = date.getMonth();
        return months[month];
    }

    getSpend() {
        let results = [];
        let result;
        let currentMonth = this.getMonth()
        let promise = new Promise((resolve, reject) => {
            firebase.database().ref('spend').child(currentMonth).once('value').then((snapshots) => {
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
                firebase.database().ref('spend').child(currentMonth).child(id).once('value').then((snapshots) => {
                    this.spend.push({id: id, data: {amount: (snapshots.val().amount), date: (snapshots.val().date)}});
                    })
                ));
        });
    }

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

    dismiss() {
        if (this.value) {
            firebase.database().ref('budget').set(this.value);
            this.modalCtrl.dismiss({
                'dismissed': true
            });
        } else {
            return alert('Please enter value');
        }
    }

    onDeleteIconClick() {
        let itemId = event.target.id;
        let currentMonth = this.getMonth();
        firebase.database().ref('spend').child(currentMonth).child(itemId).remove();
        location.reload();
    }

    ngOnInit() {
        this.list ? this.getSpend() : this.getValue();
    }



}