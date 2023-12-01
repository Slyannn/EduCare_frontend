import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent as SignupOrganismComponent} from "./pages/organism/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent as OrganismProfile} from "./pages/organism/profile/profile.component";
import {ProfileComponent as StudentProfile} from "./pages/student/profile/profile.component";
import {OrganismGuard} from "./guard/organism.guard";
import {StudentGuard} from "./guard/student.guard";

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
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'organism/profile',
    component: OrganismProfile,
    pathMatch: 'full',
    canActivate:[OrganismGuard],
  },
  {
    path: 'student/profile',
    component: StudentProfile,
    pathMatch: 'full',
    canActivate:[StudentGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
