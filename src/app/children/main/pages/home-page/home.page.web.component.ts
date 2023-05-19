import { Component, OnInit } from '@angular/core';
import { IPatientCardData } from '../../data/interfaces/patient-card-data.interface';
import { PatientDataService } from '../../data/services/patient-data.service';
import { logMessages } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.web.component.html',
    styleUrls: ['./styles/home.page.web.component.scss']
})
export class HomePageWebComponent implements OnInit {
    public patientCardData!: IPatientCardData;

    constructor(
        private _patientDataService: PatientDataService
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatientData(4)
            .subscribe((user: any) => {
                const d: string = user.email;
                console.log(d);
            });
        this.patientCardData = {
            photo: 'patient-img.svg',
            patientCardFields: [
                {
                    label: 'ФИО',
                    data: 'Иванов Иван Иваныч'
                },
                {
                    label: 'возраст',
                    data: '36 лет'
                }
            ]
        };
    }
}
