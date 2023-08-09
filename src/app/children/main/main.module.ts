import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { UpdateDataService } from './services/update-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OPEN_NAVIGATION_TOKEN } from './data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@NgModule({
    declarations: [
        MainLayoutComponent,
        MainHeaderComponent,
        NavigationComponent,
        NavigationButtonComponent,
        MainFooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        MainHeaderComponent,
        MainFooterComponent
    ],
    providers: [
        UpdateDataService,
        {
            provide: OPEN_NAVIGATION_TOKEN,
            useValue: new BehaviorSubject<boolean>(false)
        }
    ]
})
export class MainModule {

}
