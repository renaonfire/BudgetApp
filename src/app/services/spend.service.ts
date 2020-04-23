import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ISpend, ISumOfSpend } from '../interfaces/spend.interface';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class SpendService {

    spendInt: ISpend;
    data: ISumOfSpend;
    sumChanged = new Subject<ISumOfSpend>();

    constructor() { }


    addSpend(month: any, date: any, value: any) {
        this.spendInt = {
            id: firebase.database().ref('spend').child(month).push().key,
            data: {
                date:  new Intl.DateTimeFormat('en-GB').format(date),
                amount: value
            }
        };
        firebase.database().ref('spend').child(month).child(this.spendInt.id).set(this.spendInt.data);
    }

    // TODO
    getSumOfSpend(month: any) {
        let results = [];
        let result;
        let value = [];
        let sum;
        let promise = new Promise((resolve, reject) => {
            firebase.database().ref('spend').child(month).once('value').then((snapshots) => {
                if (snapshots.val()) {
                    results.push(Object.keys(snapshots.val()));
                    result = results[0];
                    resolve(result);
                } else {
                    this.data.spend = 0;
                }
            });
        })
        promise.then((values: []) => {
            values.map((id: string) => (
                firebase.database().ref('spend').child(month).child(id).once('value').then((snapshots) => {
                    value.push(snapshots.val().amount) as number;
                    sum = value.reduce((a, b) => a + b) as number;
                    console.log('sum is ', sum);
                    this.data.spend = sum;
                    this.data.remainder = this.data.budget - this.data.spend;
                    })
                ));
        });
        this.sumChanged.next(this.data);
    }
}