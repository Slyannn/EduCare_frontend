import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent as SignupOrganismComponent} from "./pages/organism/signup/signup.component";

const routes: Routes = [
  {
    path: 'accueil',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: 'organism/signup',
    component: SignupOrganismComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
