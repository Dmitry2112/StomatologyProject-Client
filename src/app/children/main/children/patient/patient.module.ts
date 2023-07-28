import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientCardComponent } from './components/patient-card/patient-card.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PhotodocsComponent } from './components/photodocs/photodocs.component';
import { TherapyComponent } from './components/therapy/therapy.component';
import { HomePageWebComponent } from './pages/home-page/home.page.web.component';
import { PhotodocsPageWebComponent } from './pages/photodocs-page/photodocs.page.web.component';
import { PlanPageWebComponent } from './pages/plan-page/plan.page.web.component';
import { PatientDataService } from './data/services/patient-data.service';
import { TherapyDataService } from './data/services/therapy-data.service';
import { AppointmentDataService } from './data/services/appointment-data.service';
import { ServiceDataService } from './data/services/service-data.service';
import { FileDataService } from './data/services/file-data.service';

@NgModule({
    declarations: [
        AppointmentComponent,
        PatientCardComponent,
        PatientFormComponent,
        PhotodocsComponent,
        TherapyComponent,
        HomePageWebComponent,
        PhotodocsPageWebComponent,
        PlanPageWebComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    providers: [
        PatientDataService,
        TherapyDataService,
        AppointmentDataService,
        ServiceDataService,
        FileDataService
    ],
    exports: [
        PatientCardComponent,
        PatientFormComponent,
        TherapyComponent,
        AppointmentComponent,
    ]
})
export class PatientModule {

}
