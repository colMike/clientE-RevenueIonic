import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ParkingSharedService {

    parkingPaymentReq = {
        "txntimestamp": "2021 04 29 14:59:42.906 EAT",
        "data": {
            "transaction_details": {
                "customer_id": 1,
                "amount": 1,
                "phone_number": "254714919919",
                "host_code": "MM",
                "transaction_type": "PARKINGPAY",
                "direction": "0200",
                "debit_account": "254714919919",
                "transaction_code": "PARKINGPAYMPESA",
                "service_code": "PARKING4",
                "service_id": 175,
                "service_name": "Daily Parking",
                "sub_county_id": 179,
                "sub_county_code": "001",
                "sub_county_name": "north",
                "car_type_id": 190,
                "car_type_name": "saloon",
                "reg_number": "KCA537J",
                "currency": "KES"
            },
            "channel_details": {
                "channel_key": "123456",
                "host": "127.0.0.1",
                "geolocation": "lat,long",
                "user_agent_version": "v1.0",
                "user_agent": "agentid",
                "client_id": "EREVENUE",
                "channel": "POS"
            }
        },
        "xref": "312228979269"
    };

    private requestObject = new BehaviorSubject(this.parkingPaymentReq);
    sharedRequest = this.requestObject.asObservable();

    constructor() { }

    nextMessage(requestObject: any) {
        this.requestObject.next(requestObject);
    }

}
