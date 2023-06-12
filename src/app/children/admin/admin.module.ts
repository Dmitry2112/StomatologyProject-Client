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
import {
    PatientDetailsHomeWebPageComponent
} from './pages/patient-details-home-page/patient-details-home.web.page.component';
import { PatientDetailsLayoutComponent } from './layouts/patient-details-layout/patient-details-layout.component';
import {
    PatientDetailsPlanWebPageComponent
} from './pages/patient-details-plan-page/patient-details-plan.web.page.component';
import {
    PatientDetailsPhotodocsWebPageComponent
} from './pages/patient-details-photodocs-page/patient-details-photodocs.web.page.component';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        AdminHeaderComponent,
        AdminFooterComponent,
        AdminNavigationComponent,
        PatientListComponent,
        PatientsPageWebComponent,
        AdminHomePageWebComponent,
        AdminCardComponent,
        PatientDetailsHomeWebPageComponent,
        PatientDetailsLayoutComponent,
        PatientDetailsPlanWebPageComponent,
        PatientDetailsPhotodocsWebPageComponent
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
