import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PatientDataService } from '../../data/services/patient-data.service';
import { PatientModel } from '../../data/models/patient.model';
import { PatientViewModel } from '../../view-models/patient.view-model';

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
        private _patientDataService: PatientDataService
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatientData(4)
            .subscribe((data: any) => {
                this.patientModel.fromDto(data);
                this.patientViewModel.fromModel(this.patientModel);

                this._ref.detectChanges();
            });
    }
}
