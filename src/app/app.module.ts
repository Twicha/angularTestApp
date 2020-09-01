import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/auth.service';
import {CommonModule} from '@angular/common';
import {AuthGuard} from './shared/guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UsersService} from './shared/services/users.service';
import {SearchPipe} from './shared/pipes/search.pipe';
import {MaterialModule} from './shared/modules/material.module';
import {CountBdPipe} from './shared/pipes/countBd.pipe';
import { ButtonComponent } from './shared/components/button/button.component';
import { UsersSearchComponent } from './shared/components/users-search/users-search.component';
import { FormComponent } from './shared/components/form/form.component';
import { FormControlComponent } from './shared/components/form-control/form-control.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreatePageComponent,
    EditPageComponent,
    UsersPageComponent,
    SearchPipe,
    CountBdPipe,
    ButtonComponent,
    UsersSearchComponent,
    FormComponent,
    FormControlComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [

  ],
  providers: [
    AuthService,
    AuthGuard,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
