import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientDataService } from '../../data/services/patient-data.service';
import { PATIENT_FORM_DATA_TOKEN } from '../../data/tokens/patient-form-data.token';
import { IPatientFormData } from '../../data/interfaces/patient-form-data.interface';
import { UpdateDataService } from '../../../../services/update-data.service';
import { IPatientFormField } from '../../data/interfaces/patient-form-field.interface';
import { IPatientRequestModel } from '../../data/request-models/patient.request-model.interface';
import { IPatientResponseModel } from '../../data/response-models/patient.response-model.interface';



@Component({
    selector: 'patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./styles/patient-form.component.scss']
})
export class PatientFormComponent implements OnInit, OnDestroy {
    @Output()
    public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    public patientFormLabels!: string[];

    public patientFormFieldsArray!: FormArray;

    public patientFormControlTypes!: string[];

    public patientForm!: FormGroup;

    public patientPhoto?: string;

    private _patientId!: number;

    private _patientFormSubscription!: Subscription;

    private _routeSubscription!: Subscription;

    constructor(
        private _patientDataService: PatientDataService,
        private _route: ActivatedRoute,
        @Inject(PATIENT_FORM_DATA_TOKEN) public patientFormData$: BehaviorSubject<IPatientFormData>,
        private _updateDataService: UpdateDataService
    ) {
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._patientId = params['patientId'];
        });

        this.patientFormData$
            .subscribe((data: IPatientFormData) => {
                if (!this.patientFormData$.getValue()) {
                    return;
                }
                this.patientFormLabels = data.patientFormFields.map((field: IPatientFormField) => field.label);
                this.patientFormFieldsArray = new FormArray(
                    data.patientFormFields.map((field: IPatientFormField) => field.control)
                );
                this.patientFormControlTypes = data.patientFormFields.map((field: IPatientFormField) => field.controlType);
                this.patientForm = new FormGroup({
                    patientFormFields: this.patientFormFieldsArray
                });
                this.patientPhoto = data.photo;
            });
    }

    public ngOnDestroy(): void {
        if (this._patientFormSubscription) {
            this._patientFormSubscription.unsubscribe();
        }

        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public get patientFormFields(): FormArray {
        return this.patientForm.controls['patientFormFields'] as FormArray;
    }

    public onSubmit(): void {
        if (this.patientForm.invalid) {
            this.patientForm.markAllAsTouched();

            return;
        }

        const data: string[] = this.patientForm.value.patientFormFields;

        this.submitPatientData(data);

        this.close();
    }

    public close(): void {
        this.isOpen.emit(false);
    }

    public submitPatientData(data: string[]): void {
        let updatePatient!: IPatientRequestModel;
        this._patientDataService.getPatientData(this._patientId)
            .pipe(
                switchMap((currentPatientData: IPatientResponseModel) => {
                    updatePatient = currentPatientData;
                    updatePatient.lastName = data[0];
                    updatePatient.firstName = data[1];
                    updatePatient.patronymic = data[2];
                    updatePatient.birthDate = data[3];

                    return this._patientDataService.updatePatientData(this._patientId, updatePatient);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }
}
