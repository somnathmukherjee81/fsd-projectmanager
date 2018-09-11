import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ViewProjectComponent },
  { path: 'tasks', component: ViewTaskComponent },
  { path: 'users', component: ViewUserComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
