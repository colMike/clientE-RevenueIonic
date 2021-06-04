import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { OrderPlacedPageRoutingModule } from './mpesa-payment-routing.module';

import { MpesaPaymentPage } from './mpesa-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OrderPlacedPageRoutingModule
  ],
  declarations: [MpesaPaymentPage]
})
export class OrderPlacedPageModule {}
