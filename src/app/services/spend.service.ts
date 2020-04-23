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
    spend: ISumOfSpend['spend'];
    budget: ISumOfSpend['budget'];
    remainder: ISumOfSpend['remainder'];
    budgetChanged = new Subject<ISumOfSpend['budget']>();
    sumChanged = new Subject<ISumOfSpend['spend']>();
    remainderChanged = new Subject<ISumOfSpend['remainder']>();
    spendRef = firebase.database().ref('spend');
    budgetRef = firebase.database().ref('budget');

    constructor() { }


    addSpend(month: any, date: any, value: any) {
        this.spendInt = {
            id: this.spendRef.child(month).push().key,
            data: {
                date:  new Intl.DateTimeFormat('en-GB').format(date),
                amount: value
            }
        };
        this.spendRef.child(month).child(this.spendInt.id).set(this.spendInt.data);
    }

    // TODO
    getSumOfSpend(month: any) {
        let results = [];
        let result;
        let value = [];
        let sum;
        let promise = new Promise((resolve, reject) => {
            this.spendRef.child(month).once('value').then((snapshots) => {
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
                this.spendRef.child(month).child(id).once('value').then((snapshots) => {
                    value.push(snapshots.val().amount) as number;
                    sum = value.reduce((a, b) => a + b) as number;
                    this.spend = sum;
                    this.remainder = this.budget - this.spend
                    this.sumChanged.next(this.spend);
                    this.remainderChanged.next(this.remainder);
                    })
                ));
        });
    }

    getBudget() {
        return new Promise((resolve, reject) => {
            this.budgetRef.once('value').then((snapshots) => {
                if (snapshots.val()) {
                    this.budget = (snapshots.val());
                    resolve([this.budget]);
                } else {
                    this.budget = 0
                }
                this.budgetChanged.next(this.budget);
            });
        })
    }
}