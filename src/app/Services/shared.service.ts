import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {


    public currentService = new BehaviorSubject('Parking');

    public currentServiceObservable = this.currentService.asObservable();

    constructor() { }

    nextMessage(newService: any) {
        this.currentService.next(newService);
    }

}
