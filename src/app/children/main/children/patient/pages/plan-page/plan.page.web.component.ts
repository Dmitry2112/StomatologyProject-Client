import { ChangeDetectorRef, Component, OnInit, Self } from '@angular/core';
import { TherapyListModel } from '../../data/models/therapy-list.model';
import { PatientDataService } from '../../data/services/patient-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DestroyService } from '../../../../../../data/services/destroy.service';
import { IPatientResponseModel } from '../../data/response-models/patient.response-model.interface';
import { takeUntil } from 'rxjs';
import { UpdateDataService } from '../../../../services/update-data.service';

@Component({
    selector: 'plan-page',
    templateUrl: './plan.page.web.component.html',
    styleUrls: ['./styles/plan.page.web.component.scss'],
    providers: [DestroyService]
})
export class PlanPageWebComponent implements OnInit {

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
