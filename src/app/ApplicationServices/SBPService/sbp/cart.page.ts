import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Item} from './item';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Parking} from './Parking';
import {BehaviorSubject, Observable} from 'rxjs';
import {SBPService} from '../../../../services/sbp.service';
import {SharedService} from '../../../Services/shared.service';
import {SbpSharedService} from '../../../Services/sbp.shared.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
    providers: [SbpSharedService, SharedService]
})
export class CartPage implements OnInit {

    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    subcounties: any;
    wards: any;
    permitTypes: any;

    parkingDetails: any = {};

    charge: number = null;
    vehicles: any = [];
    parkingTypes: any = [];
    parkingZones: any = [];
    parkingChargesResponse: any;
    parkingCharges: Parking[] = [];

    formGroup = this.fb.group({
            businessName: new FormControl(''),
            regNo: new FormControl(''),
            PIN: new FormControl(''),
            vat: new FormControl(''),
            postalAdd: new FormControl(''),
            postalCode: new FormControl(''),
            postalTown: new FormControl(''),

            mobileNo: new FormControl(''),
            altMobileNo: new FormControl(''),
            email: new FormControl(''),
            landZone: new FormControl(''),
            plotNo: new FormControl(''),
            building: new FormControl(''),
            room: new FormControl(''),

            applicant: new FormControl(''),
            nationalId: new FormControl(''),
            documentType: new FormControl(''),
            applicantMobile: new FormControl(''),
            personalNumber: new FormControl(''),
            personalAdd: new FormControl(''),
            personalCode: new FormControl(''),

            businessDesc: new FormControl(''),
            area: new FormControl(''),
            appliedFor: new FormControl(''),
            otherActivity: new FormControl(''),
            noOfEmployees: new FormControl(''),
            permitTypeId: new FormControl(''),
            subcountyId: new FormControl(''),
            wardId: new FormControl(''),

            createdBy: new FormControl(''),
            electricityAccNo: new FormControl(''),

            expiryDate: new FormControl(''),
            validity: new FormControl(''),

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

    sbpDetails: any = {};

    constructor(
        private route: Router,
        private modalController: ModalController,
        public fb: FormBuilder,
        private sbpSvc: SBPService,
        private sbpSharedSvc: SbpSharedService,
        private sharedSvc: SharedService
    ) {
        this.updateCurrentServiceBehavior();
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

        this.sbpSharedSvc.sharedRequest.subscribe(result => this.sbpDetails = result);
        this.itemsList = [{zoneId: '775', zoneName: 'Nyandarua'}, {zoneId: '776', zoneName: 'Meru'}];
        // this.getAllParkingZones();
        this.getAllPermitTypes();
        this.getAllSubCounties();
    }


    payment() {

        this.sbpDetails.data.transaction_details.business_name = this.formGroup.get('businessName').value;
        this.sbpDetails.data.transaction_details.business_regno = this.formGroup.get('regNo').value;
        this.sbpDetails.data.transaction_details.business_pinno = this.formGroup.get('PIN').value;
        this.sbpDetails.data.transaction_details.business_vatno = this.formGroup.get('vat').value;
        this.sbpDetails.data.transaction_details.business_postaladdress = this.formGroup.get('postalAdd').value;
        this.sbpDetails.data.transaction_details.business_postalcode = this.formGroup.get('postalCode').value;
        this.sbpDetails.data.transaction_details.business_postaltown = this.formGroup.get('postalTown').value;

        this.sbpDetails.data.transaction_details.business_mobileno = this.formGroup.get('mobileNo').value;
        this.sbpDetails.data.transaction_details.business_altmobileno = this.formGroup.get('altMobileNo').value;
        this.sbpDetails.data.transaction_details.business_landzone = this.formGroup.get('landZone').value;
        this.sbpDetails.data.transaction_details.business_plotno = this.formGroup.get('plotNo').value;
        this.sbpDetails.data.transaction_details.business_buildingname = this.formGroup.get('building').value;
        this.sbpDetails.data.transaction_details.business_roomname = this.formGroup.get('room').value;

        this.sbpDetails.data.transaction_details.first_name = this.formGroup.get('applicant').value;
        this.sbpDetails.data.transaction_details.document_type = this.formGroup.get('documentType').value;
        this.sbpDetails.data.transaction_details.document_number = this.formGroup.get('nationalId').value;
        this.sbpDetails.data.transaction_details.application_mobileno = this.formGroup.get('applicantMobile').value;
        this.sbpDetails.data.transaction_details.personal_mobileno = this.formGroup.get('personalNumber').value;
        this.sbpDetails.data.transaction_details.personal_address = this.formGroup.get('personalAdd').value;
        this.sbpDetails.data.transaction_details.personal_addresscode = this.formGroup.get('personalCode').value;

        this.sbpDetails.data.transaction_details.business_description = this.formGroup.get('businessDesc').value;
        this.sbpDetails.data.transaction_details.other_activity = this.formGroup.get('otherActivity').value;
        this.sbpDetails.data.transaction_details.area = this.formGroup.get('area').value;
        this.sbpDetails.data.transaction_details.applied_for = new Date().getFullYear();
        this.sbpDetails.data.transaction_details.no_ofemployees = this.formGroup.get('noOfEmployees').value;
        this.sbpDetails.data.transaction_details.permit_id = parseInt(this.formGroup.get('permitTypeId').value, 10);
        this.sbpDetails.data.transaction_details.sub_county_id =  parseInt(this.formGroup.get('subcountyId').value, 10);
        this.sbpDetails.data.transaction_details.ward_id =  parseInt(this.formGroup.get('wardId').value, 10);


        this.updateSBPRequest(this.sbpDetails);

        this.route.navigate(['./sbp-payment']);
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

        // this.sbpSvc.getParkingPriceDetails(parkingBody).subscribe(result => {
        //     this.parkingCharges = JSON.parse(result.data.response.parking_types);
        //
        //     console.log('this.parkingCharges');
        //     console.log(this.parkingCharges);
        // });

    }

    getParkingCharge() {
        // alert('in funxtion');
        // console.log(this.dailyFormControl);
        //
        // if (this.formGroup.get('regNumber').touched && this.formGroup.get('regNumber').valid
        //     &&
        //     this.formGroup.get('parkingType').touched
        //     &&
        //     this.formGroup.get('parkingZone').touched
        //     &&
        //     this.formGroup.get('vehicleType').touched
        // ) {
        //
        //     const serviceId = this.formGroup.get('parkingType').value;
        //     const subCountyId = this.formGroup.get('parkingZone').value;
        //     const carTypeId = this.formGroup.get('vehicleType').value;
        //
        //     // this.isLoadingSubject.next(true);

        const permitTypeId = this.formGroup.get('permitTypeId').value;

        const permitSpecs = this.permitTypes.find(item => {
            return item.permitTypeId == permitTypeId;
        });

        const correctPriceConfig = permitSpecs.permitFee;

        console.log(correctPriceConfig);
        //
        if (correctPriceConfig === undefined) {
            this.charge = 0;
            // alert(this.charge);

        } else {
            this.charge = correctPriceConfig;
            // alert('has value' + this.charge);

        }
        //     // alert('mwisho charge ni' + this.charge);
        //
        return this.charge;
        // }
    }

    isControlValid(controlName: string): boolean {
        const control = this.formGroup.controls[controlName];


        return control.valid && (control.dirty || control.touched);
    }

    isControlInvalid(controlName: string): boolean {
        const control = this.formGroup.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    }

    //  Get Permit Types
    getAllPermitTypes() {
        this.sbpSvc.getPermitTypes().subscribe(result => {


            this.permitTypes = JSON.parse(result.data.response.sbptype_data).map(permitType => {
                return {
                    permitTypeId: permitType.permit_type_id,
                    permitTypeName: permitType.permit_type_name,
                    permitFee: permitType.permit_fee
                };
            });

        });
    }

    //  Get Subcounties
    getAllSubCounties() {
        this.sbpSvc.getParkingZones().subscribe(result => {

            this.subcounties = JSON.parse(result.data.response.sub_counties).map(parkingZone => {
                return {
                    zoneId: parkingZone.sub_county_id,
                    zoneName: parkingZone.sub_county_name
                };
            });

        });
    }

    //  Get Wards
    getAllWards(event) {

        let subCountyId;
        if (event.detail.value === undefined) {
            return this.wards = [{
                wardId: '',
                wardName: 'No wards found'
            }];
        }
        subCountyId = event.detail.value;

        console.log('subCountyId');
        console.log(subCountyId);
        this.sbpSvc.getWards(subCountyId).subscribe(result => {

            if (result.data.response.wards === undefined) {
                return this.wards = [{
                    wardId: '',
                    wardName: 'No wards found'
                }];
            }

            this.wards = JSON.parse(result.data.response.wards).map(wards => {
                return {
                    wardId: wards.ward_id,
                    wardName: wards.ward_name
                };
            });

        }, error => {
            return this.wards = [{
                wardId: '',
                wardName: 'No wards found'
            }];
        });
    }

    updateCurrentServiceBehavior() {
        console.log('State changed to sbp');
        this.sharedSvc.nextMessage('SBP');
    }

    updateSBPRequest(sbpDetails) {
        this.sbpSharedSvc.nextMessage(sbpDetails);
    }


}
