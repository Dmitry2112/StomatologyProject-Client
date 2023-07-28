import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientDataService } from '../../data/services/patient-data.service';
import { UpdateDataService } from '../../../../services/update-data.service';
import { IPatientResponseModel } from '../../data/response-models/patient.response-model.interface';
import { IPatientRequestModel } from '../../data/request-models/patient.request-model.interface';
import { IAppointment } from '../../data/interfaces/appointment.interface';
import { ITherapy } from '../../data/interfaces/therapy.interface';
import { AppointmentDataService } from '../../data/services/appointment-data.service';
import { IAppointmentRequestModel } from '../../data/request-models/appointment.request-model.interface';

@Component({
    selector: 'therapy',
    templateUrl: './therapy.component.html',
    styleUrls: ['./styles/therapy.component.scss']
})
export class TherapyComponent implements OnInit {
    @Input()
    public canEdit: boolean = false;

    @Input()
    public therapyData!: ITherapy;

    public completedAppointments: IAppointment[] = this.therapyData.appointments
        .filter((appointment: IAppointment) => {
            return appointment.completed;
        });

    public plannedAppointments: IAppointment[] = this.therapyData.appointments
        .filter((appointment: IAppointment) => {
            return !appointment.completed;
        });

    public showCompletedAppointmentsForm: boolean = false;
    public showPlannedAppointmentsForm: boolean = false;

    public addAppointmentForm: FormGroup = new FormGroup({
        number: new FormControl('', [
            Validators.required
        ]),
        name: new FormControl('', [
            Validators.required
        ]),
        date: new FormControl('', [
            Validators.required
        ]),
    });

    private _patientId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _ref: ChangeDetectorRef,
        private _patientDataService: PatientDataService,
        private _appointmentDataService: AppointmentDataService,
        private _route: ActivatedRoute,
        private _updateDataService: UpdateDataService
    ) {
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._patientId = params['patientId'];
        });
    }

    public addCompletedAppointments(): void {
        this.showCompletedAppointmentsForm = true;
    }

    public cancelCompletedAppointments(): void {
        this.showCompletedAppointmentsForm = false;
    }

    public addPlannedAppointments(): void {
        this.showPlannedAppointmentsForm = true;
    }

    public cancelPlannedAppointments(): void {
        this.showPlannedAppointmentsForm = false;
    }

    public delete(id: number): void {
        this._appointmentDataService.deleteAppointment(id)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }
    // public delete(id: number, date: string | Date): void {
    //     let patient!: IPatientRequestModel;
    //     this._patientDataService.getPatientData(this._patientId)
    //         .pipe(
    //             switchMap((data: IPatientResponseModel) => {
    //                 patient = data;
    //                 if (new Date(date).getTime() < Date.now()) {
    //                     patient.therapyList[0]
    //                         .completedAppointments = patient.therapyList[0]
    //                             .completedAppointments
    //                             .filter((appointment: IAppointment) => {
    //                                 return appointment.id !== id;
    //                             });
    //                 } else {
    //                     patient.therapyList[0]
    //                         .plannedAppointments = patient.therapyList[0]
    //                             .plannedAppointments
    //                             .filter((appointment: IAppointment) => {
    //                                 return appointment.id !== id;
    //                             });
    //                 }
    //                 return this._patientDataService.updatePatientData(this._patientId, patient);
    //             })
    //         ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    // }

    public onSubmit(): void {
        if (this.addAppointmentForm.invalid) {
            this.addAppointmentForm.markAllAsTouched();

            return;
        }

        this.showCompletedAppointmentsForm = false;
        this.showPlannedAppointmentsForm = false;
        const newAppointment: IAppointmentRequestModel = {
            name: this.addAppointmentForm.value.name,
            number: this.addAppointmentForm.value.number,
            recommendations: '',
            date: this.addAppointmentForm.value.date,
            completed: false,
            therapyId : this.therapyData.id
        };

        this._appointmentDataService.addAppointment(newAppointment)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    // public onSubmit(): void {
    //     if (this.addAppointmentForm.invalid) {
    //         this.addAppointmentForm.markAllAsTouched();
    //
    //         return;
    //     }
    //
    //     this.showCompletedAppointmentsForm = false;
    //     this.showPlannedAppointmentsForm = false;
    //     let newAppointment: IAppointment = {} as IAppointment;
    //     if (new Date(this.addAppointmentForm.value.dateAppointment).getTime() < Date.now()) {
    //         newAppointment = {
    //             id: Date.now(),
    //             number:  this.addAppointmentForm.value.numberAppointment,
    //             name: this.addAppointmentForm.value.nameStageTherapy,
    //             date: this.addAppointmentForm.value.dateAppointment,
    //             services: [],
    //             recommendations: 'Рекомендаций нет'
    //         };
    //     } else {
    //         newAppointment = {
    //             id: Date.now(),
    //             number:  this.addAppointmentForm.value.numberAppointment,
    //             name: this.addAppointmentForm.value.nameStageTherapy,
    //             date: this.addAppointmentForm.value.dateAppointment,
    //             services: [],
    //         };
    //     }
    //
    //     let updatePatient!: IPatientRequestModel;
    //     this._patientDataService.getPatientData(this._patientId)
    //         .pipe(
    //             switchMap((currentPatientData: IPatientResponseModel) => {
    //                 updatePatient = currentPatientData;
    //                 if (new Date(this.addAppointmentForm.value.dateAppointment).getTime() < Date.now()) {
    //                     updatePatient.therapyList[0]
    //                         .completedAppointments.push(newAppointment);
    //                 } else {
    //                     updatePatient.therapyList[0]
    //                         .plannedAppointments.push(newAppointment);
    //                 }
    //
    //                 return this._patientDataService.updatePatientData(this._patientId, updatePatient);
    //             })
    //         ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    // }
}
