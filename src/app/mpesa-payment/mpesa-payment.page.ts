import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-placed',
  templateUrl: './mpesa-payment.page.html',
  styleUrls: ['./mpesa-payment.page.scss'],
})
export class MpesaPaymentPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  tabs() {
    this.navCtrl.navigateRoot(['./order-placed']);
  } 
}
