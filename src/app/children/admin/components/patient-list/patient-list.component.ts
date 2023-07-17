import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PatientDataService } from '../../../main/children/patient/data/services/patient-data.service';
import { IPatientResponseModel } from '../../../main/children/patient/data/response-models/patient.response-model.interface';

@Component({
    selector: 'patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./styles/patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
    public patients: IPatientResponseModel[] = [];

    constructor(
        private _patientDataService: PatientDataService,
        private _ref: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatients()
            .subscribe((users: IPatientResponseModel[]) => {
                this.patients = users.filter((user: IPatientResponseModel) => {
                    return user.role === 'PATIENT';
                });

                this._ref.detectChanges();
            });
    }
}
