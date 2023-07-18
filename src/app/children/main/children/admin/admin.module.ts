import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminCardComponent } from './components/admin-card/admin-card.component';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PopupComponent } from './components/popup/popup.component';
import { PatientModule } from '../patient/patient.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PatientDetailsLayoutComponent } from './layouts/patient-details-layout/patient-details-layout.component';
import { AdminDataService } from './data/services/admin-data.service';
import { OPEN_NAVIGATION_TOKEN } from '../../data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';
import { PATIENT_FORM_DATA_TOKEN } from '../patient/data/tokens/patient-form-data.token';
import { IPatientFormData } from '../patient/data/interfaces/patient-form-data.interface';
import { AdminHomePageWebComponent } from './pages/admin-home-page/admin-home.page.web.component';
import {
    PatientDetailsHomeWebPageComponent
} from './pages/patient-details-home-page/patient-details-home.web.page.component';
import {
    PatientDetailsPhotodocsWebPageComponent
} from './pages/patient-details-photodocs-page/patient-details-photodocs.web.page.component';
import {
    PatientDetailsPlanWebPageComponent
} from './pages/patient-details-plan-page/patient-details-plan.web.page.component';
import { PatientsPageWebComponent } from './pages/patients-page/patients.page.web.component';
import { MainModule } from '../../main.module';

@NgModule({
    declarations: [
        AdminCardComponent,
        AdminNavigationComponent,
        PatientListComponent,
        PopupComponent,
        AdminLayoutComponent,
        PatientDetailsLayoutComponent,
        AdminHomePageWebComponent,
        PatientDetailsHomeWebPageComponent,
        PatientDetailsPhotodocsWebPageComponent,
        PatientDetailsPlanWebPageComponent,
        PatientsPageWebComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PatientModule,
        MainModule
    ],
    providers: [
        AdminDataService,
        {
            provide: OPEN_NAVIGATION_TOKEN,
            useValue: new BehaviorSubject<boolean>(false)
        },
        {
            provide: PATIENT_FORM_DATA_TOKEN,
            useValue: new BehaviorSubject<IPatientFormData | null>(null)
        }
    ],
    exports: []
})
export class AdminModule {

}
