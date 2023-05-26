import { Component, Input } from '@angular/core';
import { IAdminCardData } from '../../data/interfaces/admin-card-field.interface';


@Component({
    selector: 'admin-card',
    templateUrl: './admin-card.component.html',
    styleUrls: ['./styles/admin-card.component.scss']
})
export class AdminCardComponent {
    @Input()
    public adminCardData!: IAdminCardData;
}
