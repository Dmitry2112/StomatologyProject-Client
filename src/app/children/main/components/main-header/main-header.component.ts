import { Component, Input } from '@angular/core';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./styles/main-header.component.scss']
})
export class MainHeaderComponent {
    @Input()
    public userInfo: string = 'Иванов Иван';
}
