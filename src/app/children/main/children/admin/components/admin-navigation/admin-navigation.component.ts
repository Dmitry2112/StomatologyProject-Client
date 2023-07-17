import { Component, Input } from '@angular/core';
import { INavigationData } from '../../data/interfaces/navigation-data.interface';

@Component({
    selector: 'admin-navigation',
    templateUrl: './admin-navigation.component.html',
    styleUrls: ['./styles/admin-navigation.component.scss']
})
export class AdminNavigationComponent {
    @Input()
    public navigationData: INavigationData[] = [];
}
