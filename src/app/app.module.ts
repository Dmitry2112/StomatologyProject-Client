import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { AuthModule } from './children/auth/auth.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
