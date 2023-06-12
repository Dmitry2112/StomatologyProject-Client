import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'patient-details-home-page',
    templateUrl: './patient-details-home.web.page.component.html',
    styleUrls: ['./styles/patient-details-home.web.page.component.scss']
})
export class PatientDetailsHomeWebPageComponent {
    constructor(private _route: ActivatedRoute) {
        console.log(this._route.snapshot.params);
    }
}
