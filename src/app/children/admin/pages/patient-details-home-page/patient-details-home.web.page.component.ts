import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientModel } from '../../../main/data/models/patient.model';
import { PatientViewModel } from '../../../main/view-models/patient.view-model';
import { PatientDataService } from '../../../main/data/services/patient-data.service';
import { IPatientResponseModel } from '../../../main/data/response-models/patient.response-model.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PATIENT_FORM_DATA_TOKEN } from '../../../main/data/tokens/employee-form-data.token';
import { IPatientFormData } from '../../../main/data/interfaces/patient-form-data.interface';
import { UpdateDataService } from '../../../main/services/update-data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'patient-details-home-page',
    templateUrl: './patient-details-home.web.page.component.html',
    styleUrls: ['./styles/patient-details-home.web.page.component.scss']
})
export class PatientDetailsHomeWebPageComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;
    public patientModel: PatientModel = new PatientModel();
    public patientViewModel: PatientViewModel = new PatientViewModel();

    private _employeeId!: number;

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
            this._employeeId = params['patientId'];
        });

        this.getPatientData();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getPatientData(): void {
        this._patientDataService.getPatientData(this._employeeId)
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
                            control: new FormControl(data.birthDate, [
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
