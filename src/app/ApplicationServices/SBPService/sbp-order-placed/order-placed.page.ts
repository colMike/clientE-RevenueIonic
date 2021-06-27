import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {SharedService} from '../../../Services/shared.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.page.html',
  styleUrls: ['./order-placed.page.scss'],
  providers: [SharedService]
})
export class OrderPlacedPage implements OnInit {

  private currentService: any;

  constructor(
      private navCtrl: NavController,
      private sharedSvc: SharedService) {

    this.sharedSvc.currentServiceObservable.subscribe(res => this.currentService = res, error => alert('error'));
  }

  ngOnInit() {

  }

  tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  }
}
