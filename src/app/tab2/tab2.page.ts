import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  items: any;

  constructor() {
  } 

  getSumOfSpend() {
    let results = [];
    let result;
    let value = [];
    let sum;
    let promise = new Promise((resolve, reject) => {
        firebase.database().ref('spend').child('May').once('value').then((snapshots) => {
            results.push(Object.keys(snapshots.val()));
            console.log(results[0])
            result = results[0];
            console.log(result);
            resolve(result);
        });
    })
    promise.then((values: []) => {
        values.map((id: string) => (
            firebase.database().ref('spend').child('May').child(id).once('value').then((snapshots) => {
                value.push(snapshots.val().amount) as number;
                sum = value.reduce((a, b) => a + b) as number;
                console.log(sum);
                this.items = sum;
                return sum;
                })
            ));
    });
}



  ngOnInit() {
    
    this.getSumOfSpend();
  
  }

}
