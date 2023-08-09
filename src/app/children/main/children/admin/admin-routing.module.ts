import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../auth/guards/auth.guard';
import { isAdminGuard } from './guards/isAdmin.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminHomePageWebComponent } from './pages/admin-home-page/admin-home.page.web.component';
import { PatientsPageWebComponent } from './pages/patients-page/patients.page.web.component';
import { PatientDetailsLayoutComponent } from './layouts/patient-details-layout/patient-details-layout.component';
import {
    PatientDetailsHomeWebPageComponent
} from './pages/patient-details-home-page/patient-details-home.web.page.component';
import {
    PatientDetailsPlanWebPageComponent
} from './pages/patient-details-plan-page/patient-details-plan.web.page.component';
import {
    PatientDetailsPhotodocsWebPageComponent
} from './pages/patient-details-photodocs-page/patient-details-photodocs.web.page.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [authGuard, isAdminGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: AdminHomePageWebComponent
            },
            {
                path: 'patient-list',
                component: PatientsPageWebComponent
            }
        ],
    },
    {
        path: 'patient-details',
        component: PatientDetailsLayoutComponent,
        canActivate: [authGuard, isAdminGuard],
        children: [
            {
                path: ':patientId/home',
                component: PatientDetailsHomeWebPageComponent
            },
            {
                path: ':patientId/plan',
                component: PatientDetailsPlanWebPageComponent
            },
            {
                path: ':patientId/photodocs',
                component: PatientDetailsPhotodocsWebPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {

}
