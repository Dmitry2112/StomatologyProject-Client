import { NgModule } from '@angular/core';
import { HomePageWebComponent } from './pages/home-page/home.page.web.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

@NgModule({
    declarations: [
        HomePageWebComponent,
        MainLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: []
})
export class MainModule {

}
