import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {FormBuilder, FormControl} from '@angular/forms';
import {ParkingSharedService} from '../../../Services/parking.shared.service';
import {ParkingService} from '../../../../services/parking.service';
import {SbpSharedService} from '../../../Services/sbp.shared.service';
import {SBPService} from '../../../../services/sbp.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './mpesa-payment.page.html',
  styleUrls: ['./mpesa-payment.page.scss'],
  providers: [ParkingSharedService, SbpSharedService]
})
export class MpesaPaymentPage implements OnInit {

  sbpDetails;

  constructor(private navCtrl: NavController,
              public fb: FormBuilder,
              private sbpSharedSvc: SbpSharedService,
              private sbpSvc: SBPService
              ) { }

  formGroup = this.fb.group({
    phoneNumber: new FormControl('')});

  ngOnInit() {
    this.sbpSharedSvc.sharedRequest.subscribe(result => this.sbpDetails = result);
  }

  get paymentFormControl() {
    return this.formGroup.controls;
  }

  onSubmit() {
    console.log(this.paymentFormControl.phoneNumber.value);

    this.sbpDetails.data.transaction_details.phone_number = this.formGroup.get('phoneNumber').value;

    // call endpoint to make payment to backend.
    this.sbpSvc.payForSBP(this.sbpDetails).subscribe(response => {

      console.log(response, 'response');
      console.log(response.status, 'response status');

      if (response.status === 201 || response.status === 200) {
        this.navCtrl.navigateRoot(['./sbp-order-placed']);
      } else {
        this.navCtrl.navigateRoot(['./sbp-mpesa-payment']);
      }
    });


  }
}
