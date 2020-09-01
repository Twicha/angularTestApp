import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CreatePageComponent} from './pages/create-page/create-page.component';
import {EditPageComponent} from './pages/edit-page/edit-page.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
  {path: 'user/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
