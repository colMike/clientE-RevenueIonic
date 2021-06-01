import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Item} from './item';
import {ParkingService} from '../../services/parking.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Parking} from './Parking';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    parkingDetails: any = {};

    charge: number = null;
    vehicles: any = [];
    parkingTypes: any = [];
    parkingZones: any = [];
    parkingChargesResponse: any;
    parkingCharges: Parking[] = [];

    formGroup = this.fb.group({

            parkingType: new FormControl(''),
            parkingZone: new FormControl(''),
            vehicleType: new FormControl(''),
            regNumber: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(9),
                    Validators.maxLength(12)
                ]
            ),
            paymentMethod: new FormControl(''),
            phoneNumber: new FormControl('',
                [
                    Validators.minLength(9),
                    Validators.maxLength(12)
                ]),
            ccname: new FormControl(''),
            ccnumber: new FormControl(''),
            ccmonth: new FormControl(''),
            ccyear: new FormControl(''),
            cccvv: new FormControl('')
        }
    );

    itemsList: Item[] = [];

    constructor(
        private route: Router,
        private modalController: ModalController,
        public fb: FormBuilder,
        private parkingSvc: ParkingService) {
    }

    get dailyFormControl() {
        return this.formGroup.controls;
    }

    get payMethod(): any {
        return this.formGroup.get('paymentMethod');
    }

    get vehicleTypes(): any {
        return this.formGroup.get('vehicleType');
    }

    get parkingType(): any {
        return this.formGroup.get('parkingType');
    }

    get parkingZone(): any {
        return this.formGroup.get('parkingZone');
    }

    get regNo(): any {
        return this.formGroup.get('regNumber');
    }

    get phoneNumber(): any {
        return this.formGroup.get('phoneNumber');
    }

    get ccNo(): any {
        return this.formGroup.get('ccnumber');
    }


    ngOnInit() {
        this.itemsList = [{zoneId: '775', zoneName: 'Nyandarua'}, {zoneId: '776', zoneName: 'Meru'}];
        // this.getAllParkingZones();
    }

// getAllParkingZones() {
    //     this.parkingSvc.getParkingZones().subscribe(result => {
    //         this.itemsList = result.map(parkingZone => {
    //             return {
    //                 zoneId: parkingZone.subCountyId,
    //                 zoneName: parkingZone.subCountyName
    //             };
    //         });
    //
    //     });
    // }

    payment() {
        this.route.navigate(['./payment']);
    }

    getAllParkingCharges() {
        const zoneId = this.formGroup.get('parkingZone').value;

        console.log('zoneId');
        console.log(zoneId);

        if (zoneId === undefined) {
            return;
        }

        const parkingBody = {
            'txntimestamp': '2021 04 29 14:59:42.906 EAT',
            'data': {
                'transaction_details': {
                    'amount': 0,
                    'phone_number': '254714919919',
                    'host_code': 'MM',
                    'transaction_type': 'PARKINGINQ',
                    'direction': '0100',
                    'debit_account': '254714919919',
                    'transaction_code': 'PARKINGINQSUB',
                    'sub_county_id': zoneId.toString(),
                    'currency': 'KES'
                },
                'channel_details': {
                    'channel_key': '123456',
                    'host': '127.0.0.1',
                    'geolocation': 'lat,long',
                    'user_agent_version': 'v1.0',
                    'user_agent': 'agentid',
                    'client_id': 'EREVENUE',
                    'channel': 'WEB'
                }
            },
            'xref': '602228979268'
        };


        this.parkingChargesResponse = {
            xref: '602228979268',
            data: {
                channel_details: {
                    user_agent_version: 'v1.0',
                    host: '192.168.13.1',
                    channel: 'POS',
                    user_agent: 'agentid',
                    client_id: 'EREVENUE',
                    channel_key: '123456',
                    geolocation: 'lat,long'
                },
                response: {
                    response_code: '00',
                    response: 'success',
                    parking_types: '[{"sub_county_id":775,"sub_county_code":"009","sub_county_name":"kiambu","car_type_id":1952,"car_type_name":"Minivan","service_id":175,"approved":"V","fee":50,"active":"true","service_code":"PARKING4","service_name":"Daily Parking"},{"sub_county_id":776,"sub_county_code":"009","sub_county_name":"kiambu","car_type_id":190,"car_type_name":"saloon","service_id":176,"approved":"V","fee":50,"active":"true","service_code":"PARKING4","service_name":"Annual Parking"}]'
                },
                transaction_details: {
                    transaction_code: 'PARKINGINQSUB',
                    amount: 0,
                    host_code: 'MM',
                    phone_number: '254714919919',
                    currency: 'KES',
                    transaction_type: 'PARKINGINQ',
                    debit_account: '254714919919',
                    sub_county_id: '775',
                    direction: '0100'
                }
            },
            txntimestamp: '2021 04 29 14:59:42.906 EAT'
        };


        this.parkingCharges = JSON.parse(this.parkingChargesResponse.data.response.parking_types);
        console.log(this.parkingCharges);

        // this.parkingSvc.getParkingPriceDetails(parkingBody).subscribe(result => {
        //     this.parkingCharges = JSON.parse(result.data.response.parking_types);
        //
        //     console.log('this.parkingCharges');
        //     console.log(this.parkingCharges);
        // });

    }

    getParkingCharge() {
        alert('in funxtion');
        console.log(this.dailyFormControl);

        if (this.formGroup.get('regNumber').touched && this.formGroup.get('regNumber').valid
            &&
            this.formGroup.get('parkingType').touched
            &&
            this.formGroup.get('parkingZone').touched
            &&
            this.formGroup.get('vehicleType').touched
        ) {

            const serviceId = this.formGroup.get('parkingType').value;
            const subCountyId = this.formGroup.get('parkingZone').value;
            const carTypeId = this.formGroup.get('vehicleType').value;

            // this.isLoadingSubject.next(true);

            const correctPriceConfig = this.parkingCharges.find(item => {
                console.log('Trying to filter.');
                // this.isLoadingSubject.next(false);
                return item.sub_county_id == subCountyId && item.car_type_id == carTypeId && item.service_code == serviceId;
            });

            console.log(correctPriceConfig);

            if (correctPriceConfig === undefined) {
                this.charge = 0;
                alert(this.charge);

            } else {
                this.charge = correctPriceConfig.fee;
                alert('has value' + this.charge);

            }
            alert('mwisho charge ni' + this.charge);

            return this.charge;
        }
    }

    isControlValid(controlName: string): boolean {
        const control = this.formGroup.controls[controlName];


        return control.valid && (control.dirty || control.touched);
    }

    isControlInvalid(controlName: string): boolean {
        const control = this.formGroup.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    }

}
