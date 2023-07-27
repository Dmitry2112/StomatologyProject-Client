import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IAppointment } from '../../data/interfaces/appointment.interface';
import { PatientDataService } from '../../data/services/patient-data.service';
import { UpdateDataService } from '../../../../services/update-data.service';
import { IService } from '../../data/interfaces/service.interface';
import { IPatientRequestModel } from '../../data/request-models/patient.request-model.interface';
import { IPatientResponseModel } from '../../data/response-models/patient.response-model.interface';

@Component({
    selector: 'appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./styles/appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
    @Input()
    public appointmentData!: IAppointment;

    @Input()
    public canEdit: boolean = false;

    public sumCostForAppointment: number = 0;

    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public serviceAddForm: FormGroup = new FormGroup({
        serviceName: new FormControl('', [
            Validators.required
        ]),
        price: new FormControl('', [
            Validators.required
        ]),
        count: new FormControl('', [
            Validators.required
        ]),
        cost: new FormControl('', [
            Validators.required
        ]),
        doctorProfile: new FormControl('', [
            Validators.required
        ])
    });

    public updateRecommendationsForm: FormGroup = new FormGroup({
        textRecommendations: new FormControl('', [
            Validators.required
        ]),
    });

    public showForm: boolean = false;
    public showRecommendationsForm: boolean = false;

    private _patientId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _patientDataService: PatientDataService,
        private _route: ActivatedRoute,
        private _updateDataService: UpdateDataService
    ) {
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._patientId = params['patientId'];
        });

        this.appointmentData.services.forEach((service: IService) => {
            this.sumCostForAppointment += service.cost;
        });
    }

    public open(): void {
        this.isOpen$.next(!this.isOpen$.value);
    }

    public add(): void {
        this.showForm = true;
    }

    public cancel(): void {
        this.showForm = false;
    }

    public editRecommendations(): void {
        this.showRecommendationsForm = true;
    }

    public cancelRecommendations(): void {
        this.showRecommendationsForm = false;
    }

    public delete(id: number): void {
        let patient!: IPatientRequestModel;
        this._patientDataService.getPatientData(this._patientId)
            .pipe(
                switchMap((data: IPatientResponseModel) => {
                    patient = data;
                    if (new Date(this.appointmentData.date).getTime() < Date.now()) {
                        patient.therapyList[0]
                            .completedAppointments[this.appointmentData.number - 1]
                            .services = patient.therapyList[0]
                                .completedAppointments[this.appointmentData.number - 1]
                                .services.filter((service: IService) => {
                                    return service.id !== id;
                                });
                    } else {
                        patient.therapyList[0]
                            .completedAppointments[this.appointmentData.number - 1]
                            .services = patient.therapyList[0]
                                .plannedAppointments[this.appointmentData.number - 1]
                                .services.filter((service: IService) => {
                                    return service.id !== id;
                                });
                    }


                    return this._patientDataService.updatePatientData(this._patientId, patient);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public onSubmit(): void {
        if (this.serviceAddForm.invalid) {
            this.serviceAddForm.markAllAsTouched();

            return;
        }

        this.showForm = false;
        const newService: IService = {
            id: Date.now(),
            name: this.serviceAddForm.value.serviceName,
            price: this.serviceAddForm.value.price,
            count: this.serviceAddForm.value.count,
            cost: this.serviceAddForm.value.cost,
            doctorProfile: this.serviceAddForm.value.doctorProfile
        };
        let updatePatient!: IPatientRequestModel;
        this._patientDataService.getPatientData(this._patientId)
            .pipe(
                switchMap((currentPatientData: IPatientResponseModel) => {
                    updatePatient = currentPatientData;
                    if (new Date(this.appointmentData.date).getTime() < Date.now()) {
                        updatePatient.therapyList[0]
                            .completedAppointments[this.appointmentData.number - 1]
                            .services.push(newService);
                    } else {
                        updatePatient.therapyList[0]
                            .plannedAppointments[this.appointmentData.number - 1]
                            .services.push(newService);
                    }

                    return this._patientDataService.updatePatientData(this._patientId, updatePatient);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public onSubmitRecommendations(): void {
        if (this.updateRecommendationsForm.invalid) {
            this.updateRecommendationsForm.markAllAsTouched();

            return;
        }
        this.isOpen$.next(false);
        let updatePatient!: IPatientRequestModel;
        this._patientDataService.getPatientData(this._patientId)
            .pipe(
                switchMap((currentPatientData: IPatientResponseModel) => {
                    updatePatient = currentPatientData;
                    updatePatient.therapyList[0]
                        .completedAppointments[this.appointmentData.number - 1]
                        .recommendations = this.updateRecommendationsForm.value.textRecommendations;

                    return this._patientDataService.updatePatientData(this._patientId, updatePatient);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }
}
