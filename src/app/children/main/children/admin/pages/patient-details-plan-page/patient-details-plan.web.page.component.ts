import { ChangeDetectorRef, Component, OnInit, Self } from '@angular/core';
import { TherapyListModel } from '../../../patient/data/models/therapy-list.model';
import { DestroyService } from '../../../../../../data/services/destroy.service';
import { PatientDataService } from '../../../patient/data/services/patient-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UpdateDataService } from '../../../../services/update-data.service';
import { takeUntil } from 'rxjs';
import { IPatientResponseModel } from '../../../patient/data/response-models/patient.response-model.interface';

@Component({
    selector: 'patient-details-plan-page',
    templateUrl: './patient-details-plan.web.page.component.html',
    styleUrls: ['./styles/patient-details-plan.web.page.component.scss'],
    providers: [DestroyService]
})
export class PatientDetailsPlanWebPageComponent implements OnInit {

    public therapyListModel: TherapyListModel = new TherapyListModel();

    private _patientId!: number;

    constructor(
        @Self()
        private readonly _destroy$: DestroyService,
        private _patientDataService: PatientDataService,
        private _route: ActivatedRoute,
        private _ref: ChangeDetectorRef,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getTherapyList();
            }
        });
    }

    public ngOnInit(): void {
        this._route.params
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe((params: Params) => {
                this._patientId = params['patientId'];
            });

        this.getTherapyList();
    }

    public getTherapyList(): void {
        this._patientDataService.getPatientData(this._patientId)
            .subscribe((data: IPatientResponseModel) => {
                this.therapyListModel.fromDto(data);

                this._ref.detectChanges();
            });
    }
}
