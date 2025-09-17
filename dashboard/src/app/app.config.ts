import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()   // ✅ enables HttpClient
  ]
};
