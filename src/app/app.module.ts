import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HomeComponent } from './home/home.component';
import { AddUpdateTaskComponent } from './add-update-task/add-update-task.component';
import { AppRoutingModule } from './/app-routing.module';
import { AboutComponent } from './about/about.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewProjectComponent } from './view-project/view-project.component';
import { AddUpdateProjectComponent } from './add-update-project/add-update-project.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    HomeComponent,
    AddUpdateTaskComponent,
    AboutComponent,
    MessagesComponent,
    ViewProjectComponent,
    AddUpdateProjectComponent,
    ViewUserComponent,
    AddUpdateUserComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
