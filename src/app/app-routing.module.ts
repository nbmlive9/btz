import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './home/service/auth.guard';

const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent
  },
   {
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'sign',
    component: SignUpComponent
  },
  {
    path: '',
     canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule) // lazy loaded Home
  },
 
  {
    path: '**',
    redirectTo: '' // wildcard MUST come last
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
