import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAppointment } from '../../data/interfaces/appointment.interface';
import { PatientDataService } from '../../data/services/patient-data.service';
import { UpdateDataService } from '../../../../services/update-data.service';
import { IService } from '../../data/interfaces/service.interface';
import { ServiceDataService } from '../../data/services/service-data.service';
import { IServiceRequestModel } from '../../data/request-models/service.request-model.interface';
import { AppointmentDataService } from '../../data/services/appointment-data.service';
import { IUpdateAppointmentRequestModel } from '../../data/request-models/update-appointment.request-model.interface';

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
        name: new FormControl('', [
            Validators.required
        ]),
        price: new FormControl('', [
            Validators.required
        ]),
        count: new FormControl('', [
            Validators.required
        ]),
        doctorSpecialization: new FormControl('', [
            Validators.required
        ])
    });

    // public updateRecommendationsForm: FormGroup = new FormGroup({
    //     textRecommendations: new FormControl(this.appointmentData?.recommendations, [
    //         Validators.required
    //     ]),
    // });
    public updateRecommendationsForm!: FormGroup;

    public showForm: boolean = false;
    public showRecommendationsForm: boolean = false;

    constructor(
        private _patientDataService: PatientDataService,
        private _appointmentDataService: AppointmentDataService,
        private _serviceDataService: ServiceDataService,
        private _route: ActivatedRoute,
        private _updateDataService: UpdateDataService
    ) {
    }

    public ngOnInit(): void {
        this.appointmentData.services.forEach((service: IService) => {
            this.sumCostForAppointment += (service.price * service.count);
        });

        this.updateRecommendationsForm = new FormGroup({
            textRecommendations: new FormControl(this.appointmentData.recommendations, [
                Validators.required
            ])
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
        this.isOpen$.next(!this.isOpen$.value);
    }

    public delete(id: number): void {
        this._serviceDataService.deleteService(id)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public onSubmit(): void {
        if (this.serviceAddForm.invalid) {
            this.serviceAddForm.markAllAsTouched();

            return;
        }

        this.showForm = false;
        const newService: IServiceRequestModel = {
            name: this.serviceAddForm.value.name,
            price: this.serviceAddForm.value.price,
            count: this.serviceAddForm.value.count,
            doctorSpecialization: this.serviceAddForm.value.doctorSpecialization,
            appointmentId: this.appointmentData.id
        };

        this._serviceDataService.addService(newService)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public onSubmitRecommendations(): void {
        if (this.updateRecommendationsForm.invalid) {
            this.updateRecommendationsForm.markAllAsTouched();

            return;
        }
        this.isOpen$.next(false);

        const updateAppointment: IUpdateAppointmentRequestModel = {
            recommendations: this.updateRecommendationsForm.value.textRecommendations,
        };

        this._appointmentDataService.updateAppointment(this.appointmentData.id, updateAppointment)
            .subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }
}
