import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientsPageWebComponent } from './pages/patients-page/patients.page.web.component';
import { AdminHomePageWebComponent } from './pages/admin-home-page/admin-home.page.web.component';
import { AdminCardComponent } from './components/admin-card/admin-card.component';
import { AdminDataService } from './data/services/admin-data.service';
import { OPEN_NAVIGATION_TOKEN } from '../main/data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        AdminHeaderComponent,
        AdminFooterComponent,
        AdminNavigationComponent,
        PatientListComponent,
        PatientsPageWebComponent,
        AdminHomePageWebComponent,
        AdminCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: [
        AdminDataService,
        {
            provide: OPEN_NAVIGATION_TOKEN,
            useValue: new BehaviorSubject<boolean>(false)
        }
    ]
})
export class AdminModule {

}
