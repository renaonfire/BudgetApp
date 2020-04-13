import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  budget: number = 0;

  constructor(public modalCtrl: ModalController) {}

  async budgetClicked() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'label': 'Budget'
      }
    });
    return await modal.present();
  }

}
