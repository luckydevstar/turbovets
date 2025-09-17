import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    LoginComponent,
    TasksComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
