import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SbpSharedService {

    sbpPaymentReq = {
        "txntimestamp": "2021 04 29 14:59:42.906 EAT",
        "data": {
            "transaction_details": {
                "customer_id": 1,
                "amount": 1,
                "phone_number": "254714919919",
                "host_code": "MM",
                "transaction_type": "SBPPAY",
                "direction": "0200",
                "debit_account": "254714919919",
                "transaction_code": "SBPPAYMPESA",
                "ward_id": 1,
                "sub_county_id": 179,
                "permit_id": 1,
                "no_ofemployees": 5,
                "other_activity": "NA",
                "applied_for": 2021,
                "area": 1500,
                "business_description": "Some business",
                "first_name": "Mzee",
                "second_name": "Wa",
                "last_name": "Kale",
                "document_type": "NATIONALID",
                "document_number": "27923345",
                "application_mobileno": "254714919919",
                "personal_mobileno": "254714919919",
                "personal_address": "254333",
                "personal_addresscode": "05005",
                "business_mobileno": "254714919919",
                "business_altmobileno": "254714919919",
                "business_email": "business@gmail.com",
                "business_landzone": "west",
                "business_plotno": "1234",
                "business_buildingname": "biz",
                "business_roomname": "12",
                "business_name": "Biz Flani",
                "business_regno": "12345",
                "business_pinno": "123456",
                "business_vatno": "12",
                "business_postaladdress": "2312",
                "business_postalcode": "00505",
                "business_postaltown": "Nairobi",
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
        "xref": "512228979269"
    }

    private requestObject = new BehaviorSubject(this.sbpPaymentReq);
    sharedRequest = this.requestObject.asObservable();

    constructor() { }

    nextMessage(requestObject: any) {
        this.requestObject.next(requestObject);
    }

}
