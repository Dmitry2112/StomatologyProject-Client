import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientDataService } from '../../data/services/patient-data.service';
import { UpdateDataService } from '../../../../services/update-data.service';
import { IAppointment } from '../../data/interfaces/appointment.interface';
import { ITherapy } from '../../data/interfaces/therapy.interface';
import { AppointmentDataService } from '../../data/services/appointment-data.service';
import { IAppointmentRequestModel } from '../../data/request-models/appointment.request-model.interface';
import { TherapyDataService } from '../../data/services/therapy-data.service';
import { IUpdateAppointmentRequestModel } from '../../data/request-models/update-appointment.request-model.interface';

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

    public completedAppointments: IAppointment[] = [];
    public plannedAppointments: IAppointment[] = [];

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

    constructor(
        private _ref: ChangeDetectorRef,
        private _patientDataService: PatientDataService,
        private _appointmentDataService: AppointmentDataService,
        private _therapyDataService: TherapyDataService,
        private _route: ActivatedRoute,
        private _updateDataService: UpdateDataService
    ) {
    }

    public ngOnInit(): void {
        this.completedAppointments = this.therapyData.appointments
            .filter((appointment: IAppointment) => {
                return appointment.completed;
            });

        this.plannedAppointments = this.therapyData.appointments
            .filter((appointment: IAppointment) => {
                return !appointment.completed;
            });
    }

    public addPlannedAppointments(): void {
        this.showPlannedAppointmentsForm = true;
    }

    public cancelPlannedAppointments(): void {
        this.showPlannedAppointmentsForm = false;
    }

    public deleteAppointment(id: number): void {
        this._appointmentDataService.deleteAppointment(id)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public deleteTherapy(id: number): void {
        this._therapyDataService.deleteTherapy(id)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public markCompleted(id: number): void {
        const updateAppointment: IUpdateAppointmentRequestModel = {
            completed: true
        };

        this._appointmentDataService.updateAppointment(id, updateAppointment)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public onSubmit(): void {
        if (this.addAppointmentForm.invalid) {
            this.addAppointmentForm.markAllAsTouched();

            return;
        }

        this.showPlannedAppointmentsForm = false;
        const newAppointment: IAppointmentRequestModel = {
            name: this.addAppointmentForm.value.name,
            number: this.addAppointmentForm.value.number,
            recommendations: 'Рекомендаций нет',
            date: this.addAppointmentForm.value.date,
            completed: false,
            therapyId : this.therapyData.id
        };

        this._appointmentDataService.addAppointment(newAppointment)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }
}
