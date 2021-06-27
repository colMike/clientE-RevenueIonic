import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MpesaPaymentPage } from './mpesa-payment.page';

const routes: Routes = [
  {
    path: '',
    component: MpesaPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPlacedPageRoutingModule {}
