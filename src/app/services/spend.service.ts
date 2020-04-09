import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})


export class SpendService {

    id: {
        amount: Number,
        date: string
    }


constructor() { }

    searchData() {
        let results = [];
        let data;
        let id;
        firebase.database().ref('spend').child('May').once('value').then(function(snapshots) {
            results.push(Object.keys(snapshots.val())[0]);
            results.forEach(item => {
                id = item;
                console.log(id);
            });
            firebase.database().ref('spend').child('May').child(id).once('value').then(function(snapshots) {
                data = snapshots.val().amount;
                console.log(data);
            });
            });
    }

}