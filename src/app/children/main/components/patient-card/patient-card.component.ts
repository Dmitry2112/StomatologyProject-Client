import { Component, Input } from '@angular/core';
import { IPatientCardData } from '../../data/interfaces/patient-card-data.interface';

@Component({
    selector: 'patient-card',
    templateUrl: './patient-card.component.html',
    styleUrls: ['./styles/patient-card.component.scss']
})
export class PatientCardComponent {
    @Input()
    public patientCardData!: IPatientCardData;
}
