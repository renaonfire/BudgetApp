import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'modal-page',
    templateUrl: 'modal.html',
    styleUrls: ['modal.scss']
})
export class ModalPage {

  // Data passed in by componentProps
    @Input() label?: string;
    @ViewChild('value', {read: '', static: false}) value;

    constructor(public modalCtrl: ModalController) {
    }   

    dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
        'dismissed': true
    });
    console.log(this.value);
    }



}