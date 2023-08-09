import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'patient',
        pathMatch: 'full'
    },
    {
        path: 'patient',
        loadChildren: () => import('./children/patient/patient-routing.module').then(module => module.PatientRoutingModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('./children/admin/admin-routing.module').then(module => module.AdminRoutingModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {
}
