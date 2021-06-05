import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {FormBuilder, FormControl} from '@angular/forms';
import {ParkingSharedService} from '../Services/parking.shared.service';
import {ParkingService} from '../../services/parking.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './mpesa-payment.page.html',
  styleUrls: ['./mpesa-payment.page.scss'],
  providers: [ParkingSharedService]
})
export class MpesaPaymentPage implements OnInit {

  parkingDetails;

  constructor(private navCtrl: NavController,
              public fb: FormBuilder,
              private parkingSharedSvc: ParkingSharedService,
              private parkingSvc: ParkingService
              ) { }

  formGroup = this.fb.group({
    phoneNumber: new FormControl('')});

  ngOnInit() {
    this.parkingSharedSvc.sharedRequest.subscribe(result => this.parkingDetails = result);
  }

  get paymentFormControl() {
    return this.formGroup.controls;
  }

  onSubmit() {
    console.log(this.paymentFormControl.phoneNumber.value);

    this.parkingDetails.data.transaction_details.phone_number = this.formGroup.get('phoneNumber').value;

    // call endpoint to make payment to backend.
    this.parkingSvc.payForParking(this.parkingDetails).subscribe(response => {

      console.log(response, 'response');
      console.log(response.status, 'response status');

      if (response.status === 201 || response.status === 200) {
        this.navCtrl.navigateRoot(['./order-placed']);
      } else {
        this.navCtrl.navigateRoot(['./mpesa-payment']);
      }
    });


  }
}
