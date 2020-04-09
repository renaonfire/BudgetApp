import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})


export class SpendService {


    sum: any
    result: any


constructor() { }


getSumOfSpend() {
    let results = [];
    let result;
    let value = [];
    let sum;
    firebase.database().ref('spend').child('May').once('value').then(function(snapshots) {
        results.push(Object.keys(snapshots.val()));
        console.log(results[0])
        result = results[0];
        console.log(result);
        result.map((id: string) => (
            firebase.database().ref('spend').child('May').child(id).once('value').then(function(snapshots) {
                value.push(snapshots.val().amount) as number;
                sum = value.reduce((a, b) => a + b) as number;
                console.log(sum);
                return sum;
            })
        ));
    });
    this.getSumOfSpend();
}

    // searchData() {
        // for (let i = 0; i < this.getDataLength(); i++) {
        //     let data = firebase.database().ref('spend').child('May').once('value').then(function(snapshots) {
        //         id = (Object.keys(snapshots.val())[i]);
        //         firebase.database().ref('spend').child('May').child(id).once('value').then(function(snapshots) {
        //             value.push(snapshots.val().amount);
        //             console.log(value);
        //         })
        //     });
        // }
        // let value = [];
        // return this.getDataLength().map((id: string) => (
        //     firebase.database().ref('spend').child('May').child(id).once('value').then(function(snapshots) {
        //         value.push(snapshots.val().amount);
        //         console.log(value);
        //     })
        // ));
    // }
}