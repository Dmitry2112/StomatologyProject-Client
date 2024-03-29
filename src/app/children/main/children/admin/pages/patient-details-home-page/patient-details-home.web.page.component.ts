import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { PatientModel } from '../../../patient/data/models/patient.model';
import { PatientViewModel } from '../../../patient/view-models/patient.view-model';
import { PatientDataService } from '../../../patient/data/services/patient-data.service';
import { PATIENT_FORM_DATA_TOKEN } from '../../../patient/data/tokens/patient-form-data.token';
import { UpdateDataService } from '../../../../services/update-data.service';
import { IPatientFormData } from '../../../patient/data/interfaces/patient-form-data.interface';
import { IPatientResponseModel } from '../../../patient/data/response-models/patient.response-model.interface';

@Component({
    selector: 'patient-details-home-page',
    templateUrl: './patient-details-home.web.page.component.html',
    styleUrls: ['./styles/patient-details-home.web.page.component.scss']
})
export class PatientDetailsHomeWebPageComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;
    public patientModel: PatientModel = new PatientModel();
    public patientViewModel: PatientViewModel = new PatientViewModel();

    private _patientId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _ref: ChangeDetectorRef,
        private _patientDataService: PatientDataService,
        private _route: ActivatedRoute,
        @Inject(PATIENT_FORM_DATA_TOKEN) public patientPersonalFormData$: BehaviorSubject<IPatientFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getPatientData();
            }
        });
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._patientId = params['patientId'];
        });

        this.getPatientData();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getPatientData(): void {
        this._patientDataService.getPatientData(this._patientId)
            .subscribe((data: IPatientResponseModel) => {
                this.patientModel.fromDto(data);
                this.patientViewModel.fromModel(this.patientModel);

                this.patientPersonalFormData$.next({
                    patientFormFields: [
                        {
                            label: 'Фамилия:',
                            control: new FormControl(data.lastName, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Имя:',
                            control: new FormControl(data.firstName, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Отчество:',
                            control: new FormControl(data.patronymic, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Дата рождения:',
                            control: new FormControl(data.DOB, [
                                Validators.required
                            ]),
                            controlType: 'date'
                        }
                    ]
                });

                this._ref.detectChanges();
            });
    }

    public open(isEdit: boolean): void {
        this.isPopupOpen = isEdit;
    }

    public close(isOpen: boolean): void {
        this.isPopupOpen = isOpen;
    }
}
