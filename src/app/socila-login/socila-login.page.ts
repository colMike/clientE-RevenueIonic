import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-socila-login',
    templateUrl: './socila-login.page.html',
    styleUrls: ['./socila-login.page.scss'],
})
export class SocilaLoginPage implements OnInit {

    hasError = false;

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    verification() {
        this.route.navigate(['./tabs/home']);
    }
}
