import { Component, Inject, Input } from '@angular/core';
import { OPEN_NAVIGATION_TOKEN } from '../../data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./styles/navigation.component.scss']
})
export class NavigationComponent {
    @Input()
    public id: string | null = null;
}
