import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ISpend } from '../interfaces/spend.interface';

@Injectable({
    providedIn: 'root'
})


export class SpendService {

    spendInt: ISpend;

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

}