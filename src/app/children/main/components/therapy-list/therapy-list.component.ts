import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PatientDataService } from '../../data/services/patient-data.service';
import { TherapyListModel } from '../../data/models/therapy-list.model';

@Component({
    selector: 'therapy-list',
    templateUrl: './therapy-list.component.html',
    styleUrls: ['./styles/therapy-list.component.scss']
})
export class TherapyListComponent implements OnInit {
    public therapyListModel: TherapyListModel = new TherapyListModel();

    constructor(
        private _ref: ChangeDetectorRef,
        private _patientDataService: PatientDataService
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatientData(4)
            .subscribe((data: any) => {
                this.therapyListModel.fromDto(data);

                this._ref.detectChanges();
            });
    }
}