import { Component, Input } from '@angular/core';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./styles/navigation.component.scss']
})
export class NavigationComponent {
    @Input()
    public id: string = '1';
}
