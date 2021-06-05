import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Urls} from './Urls';

@Injectable({
    providedIn: 'root'
})
export class SBPService {

    API_URL = new Urls();

    constructor(private http: HttpClient) {
    }


    getCountyDetails(countyBody): Observable<any> {
        return this.http.post(`${this.API_URL.servletUrl}/DCCountiesInfoServlet`, countyBody);
    }

    getParkingPriceDetails(parkingBody): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.post(`${this.API_URL.servletUrl}/DCParkingInfoServlet`, parkingBody);
    }




    // get all parking details.
    // get parking types
    getParkingTypes(): Observable<any> {
        return this.http.get(`${this.API_URL.url}/parkingService/viewParkings`);
    }

    // get parking zones
    getParkingZones(): Observable<any> {
        // return this.http.get(`${this.API_URL.url}/zoneService/viewZones`);
        return this.http.post(`http://197.220.114.46:20202/DCCountiesInfo/DCCountiesInfoServlet`, {
            "txntimestamp": "2021 04 29 14:59:42.906 EAT",
            "data": {
                "transaction_details": {
                    "amount": 0,
                    "phone_number": "254714919919",
                    "host_code": "MM",
                    "transaction_type": "COUNTIESINQ",
                    "direction": "0200",
                    "debit_account": "254714919919",
                    "transaction_code": "COUNTIESINQSUB",
                    "currency": "KES"
                },
                "channel_details": {
                    "channel_key": "123456",
                    "host": "127.0.0.1",
                    "geolocation": "android kit kat",
                    "user_agent_version": "android kit kat",
                    "user_agent": "android",
                    "client_id": "EREVENUE",
                    "channel": "POS"
                }
            },
            "xref": "602228979268"
        });
    }

    // get wards
    getWards(subCountyId): Observable<any> {
        // return this.http.get(`${this.API_URL.url}/zoneService/viewZones`);
        return this.http.post(`http://197.220.114.46:20202/DCCountiesInfo/DCCountiesInfoServlet`, {
            "txntimestamp": "2021 04 29 14:59:42.906 EAT",
            "data": {
                "transaction_details": {
                    "amount": 0,
                    "phone_number": "254714919919",
                    "host_code": "MM",
                    "transaction_type": "COUNTIESINQ",
                    "direction": "0200",
                    "debit_account": "254714919919",
                    "transaction_code": "COUNTIESINQWARD",
                    "sub_county_id": subCountyId,
                    "currency": "KES"
                },
                "channel_details": {
                    "channel_key": "123456",
                    "host": "127.0.0.1",
                    "geolocation": "android kit kat",
                    "user_agent_version": "android kit kat",
                    "user_agent": "android",
                    "client_id": "EREVENUE",
                    "channel": "POS"
                }
            },
            "xref": "602228979268"
        });
    }

    getPermitTypes(): Observable<any> {
        return this.http.post(`http://197.220.114.46:20202/DCSBPPermitTypes/DCSBPPermitTypesServlet`, {
            "txntimestamp": "2021 04 29 14:59:42.906 EAT",
            "data": {
                "transaction_details": {
                    "customer_id": 1,
                    "amount": 0,
                    "phone_number": "254714919919",
                    "host_code": "MM",
                    "transaction_type": "SBPTYPES",
                    "direction": "0200",
                    "debit_account": "254714919919",
                    "transaction_code": "SBPTYPESMMA",
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
        });
    }

    // get vehicle types
    getVehicleTypes(): Observable<any> {
        return this.http.get(`${this.API_URL.url}/carsService/viewCars`);
    }

    // get parking charges
    getParkingCharges(chargeReq): Observable<any> {
        return this.http.post(`${this.API_URL.url}/parkingService/getParkingCharges`, chargeReq);
    }

    // get all parking charges
    getAllParkingCharges(): Observable<any> {
        return this.http.get(`${this.API_URL.url}/parkingService/getAllPriceConfigs`);
    }


    payForSBP(Parking): Observable<any> {
        // return this.http.post(`${this.API_URL.url}/parkingService/makeParkingPayment`, Parking, {observe: 'response'});
        return this.http.post(`http://197.220.114.46:20202/DCSBPPayment/DCSBPPaymentServlet`, Parking, {observe: 'response'});
    }
}


