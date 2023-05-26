import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PatientDataService } from '../../data/services/patient-data.service';
import { PatientModel } from '../../data/models/patient.model';
import { PatientViewModel } from '../../view-models/patient.view-model';
import { IPatientResponseModel } from '../../data/response-models/patient.response-model.interface';
import { AuthService } from '../../../auth/data/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.web.component.html',
    styleUrls: ['./styles/home.page.web.component.scss']
})
export class HomePageWebComponent implements OnInit {
    public patientModel: PatientModel = new PatientModel();
    public patientViewModel: PatientViewModel = new PatientViewModel();

    constructor(
        private _ref: ChangeDetectorRef,
        private _patientDataService: PatientDataService,
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatientData(Number(localStorage.getItem('userId')))
            .subscribe((data: IPatientResponseModel) => {
                this.patientModel.fromDto(data);
                this.patientViewModel.fromModel(this.patientModel);

                this._ref.detectChanges();
            });
    }
}
