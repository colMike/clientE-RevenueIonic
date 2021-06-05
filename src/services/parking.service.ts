import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Urls} from './Urls';

@Injectable({
    providedIn: 'root'
})
export class ParkingService {

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
        return this.http.get(`${this.API_URL.url}/zoneService/viewZones`);
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


    payForParking(Parking): Observable<any> {
        return this.http.post(`http://197.220.114.46:20202/DCParkingPayment/DCParkingPaymentServlet`, Parking, {observe: 'response'});
    }
}


