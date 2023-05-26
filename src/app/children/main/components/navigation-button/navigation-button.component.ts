import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'navigation-button',
    templateUrl: './navigation-button.component.html',
    styleUrls: ['./styles/navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit {
    @Input()
    public pageRout!: string;

    @Input()
    public id!: string | null;

    @Input()
    public name!: string;

    @Input()
    public iconSrc!: string;

    public routLink!: string;

    public ngOnInit(): void {
        this.routLink = `${this.id}/${this.pageRout}`;
    }
}
