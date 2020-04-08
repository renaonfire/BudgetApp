import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    
    return this.items = firebase.database().ref('spend').child('May').once('value').then(function(snapshot) {
      let spend = (snapshot.val().amount) || 'None';
      console.log(spend);
    })
  }

}
