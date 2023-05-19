import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPatientCardData } from '../../data/interfaces/patient-card-data.interface';
import { PatientDataService } from '../../data/services/patient-data.service';
import { PatientModel } from '../../data/models/patient.model';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.web.component.html',
    styleUrls: ['./styles/home.page.web.component.scss']
})
export class HomePageWebComponent implements OnInit {
    public patientCardData!: IPatientCardData;
    public patientModel: PatientModel = new PatientModel();

    constructor(
        private _ref: ChangeDetectorRef,
        private _patientDataService: PatientDataService
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatientData(4)
            .subscribe((data: any) => {
                this.patientModel.fromDto(data);
                this.patientCardData = {
                    photo: this.patientModel.photo,
                    patientCardFields: [
                        {
                            label: 'ФИО',
                            data: `${this.patientModel.lastName} ${this.patientModel.firstName} ${this.patientModel.patronymic}`
                        },
                        {
                            label: 'возраст',
                            data: this.patientModel.birthDate
                        }
                    ]
                };
                this._ref.detectChanges();
            });
    }
}
