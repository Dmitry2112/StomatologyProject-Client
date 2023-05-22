import { Component, Input, OnInit } from '@angular/core';
import { IAppointmentData } from '../../data/interfaces/appointment-data.interface';
import { IService } from '../../data/interfaces/service.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./styles/appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
    @Input()
    public appointmentData!: IAppointmentData;

    public sumCostForAppointment: number = 0;

    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public ngOnInit(): void {
        this.appointmentData.services.forEach((service: IService) => {
            this.sumCostForAppointment += service.cost;
        });
    }

    public open(): void {
        this.isOpen$.next(!this.isOpen$.value);
    }
}
