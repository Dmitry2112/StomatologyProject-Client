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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {
}
