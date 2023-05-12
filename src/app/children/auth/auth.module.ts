import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageWebComponent } from './pages/login-page/login.page.web.component';
import { RegisterPageWebComponent } from './pages/register-page/register.page.web.component';
import { AuthLayoutWebComponent } from './layuots/auth-layout/auth-layout.web.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ValidationMessageComponent } from './components/validation/message.validation.component';
import { AuthHeaderComponent } from './components/header/auth-header.component';
import { FooterComponent } from './components/footer/footer.component';

const components: any[] = [
    LoginPageWebComponent,
    RegisterPageWebComponent,
    AuthLayoutWebComponent,
    AuthHeaderComponent,
    FooterComponent
];

@NgModule({
    declarations: [...components],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        RouterModule,
        AppRoutingModule,
        ValidationMessageComponent
    ],
    exports: [LoginPageWebComponent, RegisterPageWebComponent],
    providers: [],
})
export class AuthModule {}
