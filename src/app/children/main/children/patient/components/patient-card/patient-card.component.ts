import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPatientCardData } from '../../data/interfaces/patient-card-data.interface';

@Component({
    selector: 'patient-card',
    templateUrl: './patient-card.component.html',
    styleUrls: ['./styles/patient-card.component.scss']
})
export class PatientCardComponent {
    @Input()
    public patientCardData!: IPatientCardData;

    @Input()
    public canEdit: boolean = false;

    @Output()
    public isEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @Input()
    public isEditINP: boolean = false;

    public edit(): void {
        this.isEdit$.next(!this.isEditINP);
    }
}
