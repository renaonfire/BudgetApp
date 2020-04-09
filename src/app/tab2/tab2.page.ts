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
  sum: any;
  result: any;

  constructor(private spendService: SpendService) {
  } 



  ngOnInit() {
    
    this.spendService.getSumOfSpend();

  }

}
