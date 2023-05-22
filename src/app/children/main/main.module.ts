import { NgModule } from '@angular/core';
import { HomePageWebComponent } from './pages/home-page/home.page.web.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { PlanPageWebComponent } from './pages/plan-page/plan.page.web.component';
import { PhotodocsPageWebComponent } from './pages/photodocs-page/photodocs.page.web.component';
import { PatientCardComponent } from './components/patient-card/patient-card.component';
import { PatientDataService } from './data/services/patient-data.service';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { TherapyListComponent } from './components/therapy-list/therapy-list.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PhotodocsComponent } from './components/photodocs/photodocs.component';

@NgModule({
    declarations: [
        HomePageWebComponent,
        PlanPageWebComponent,
        PhotodocsPageWebComponent,
        MainLayoutComponent,
        MainHeaderComponent,
        NavigationComponent,
        NavigationButtonComponent,
        PatientCardComponent,
        MainFooterComponent,
        TherapyListComponent,
        AppointmentComponent,
        PhotodocsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: [
        PatientDataService
    ]
})
export class MainModule {

}
