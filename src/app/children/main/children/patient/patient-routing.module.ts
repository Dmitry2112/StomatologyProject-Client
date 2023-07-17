import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { authGuard } from '../../../auth/guards/auth.guard';
import { HomePageWebComponent } from './pages/home-page/home.page.web.component';
import { PlanPageWebComponent } from './pages/plan-page/plan.page.web.component';
import { PhotodocsPageWebComponent } from './pages/photodocs-page/photodocs.page.web.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: ':patientId/home',
                pathMatch: 'full'
            },
            {
                path: ':patientId/home',
                component: HomePageWebComponent
            },
            {
                path: ':patientId/plan',
                component: PlanPageWebComponent
            },
            {
                path: ':patientId/photodocs',
                component: PhotodocsPageWebComponent
            }
        ],
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PatientRoutingModule {

}
