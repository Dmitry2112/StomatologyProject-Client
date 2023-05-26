import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PatientsPageWebComponent } from './pages/patients-page/patients.page.web.component';
import { AdminHomePageWebComponent } from './pages/admin-home-page/admin-home.page.web.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [authGuard],
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {

}
