import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {Item} from '../../ApplicationServices/ParkingService/parking/item';
import {ITEMS} from '../../ApplicationServices/ParkingService/parking/mock-data';
import {ParkingService} from '../../../services/parking.service';

@Component({
    selector: 'app-variation-selection',
    templateUrl: './variation-selection.page.html',
    styleUrls: ['./variation-selection.page.scss'],
})
export class VariationSelectionPage implements OnInit {

    radioSel: any;
    radioSelected: string;
    radioSelectedString: string;
    itemsList: Item[] = [];


    constructor(
        private modalController: ModalController,
        private parkingSvc: ParkingService) {
        this.radioSelected = '';
        this.getSelecteditem();
    }

    getSelecteditem() {
        this.radioSel = ITEMS.find(Item => Item.zoneId === this.radioSelected);
        this.radioSelectedString = JSON.stringify(this.radioSel);
    }

    onItemChange(item) {
        this.getSelecteditem();
    }

    ngOnInit() {
        this.itemsList = [{zoneId: '201', zoneName: 'Nyandarua'}, {zoneId: '202', zoneName: 'Meru'}];
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

    dismiss() {
        this.modalController.dismiss();
    }
}
