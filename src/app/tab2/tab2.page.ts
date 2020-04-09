import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SpendService } from '../services/spend.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  items: any[];

  constructor(private spendService: SpendService) {
  } 

  getData() {
    // firebase.database().ref('spend').child('May').once('value').then(function(snapshot) {
    //       let docs = [(snapshot.val())] || [];
    //       docs.map(a => {
    //         const object = a
    //         // console.log(...object);
    //         // return {...object};
    //       })
          // let doc = docs[0]
          // let object = doc.amount;
          // console.log(doc);
          // console.log(object);
          // this.items = docs;
          
    //     }
    // )

// .snapshotChanges()
// .map(actions => {
//    return actions.map(a => {
//      //Get document data
//      const data = a.payload.doc.data() as Task;
//      //Get document id
//      const id = a.payload.doc.id;
//      //Use spread operator to add the id to the document data
//      return { id, …data };
//    });
// });
    // return this.items;
  }

  ngOnInit() {
    
    this.spendService.searchData();

  }

}
