import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent as SignupOrganismComponent} from "./pages/organism/signup/signup.component";
import {SignupComponent as SignupStudentComponent} from "./pages/student/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent as OrganismProfile} from "./pages/organism/profile/profile.component";
import {ProfileComponent as StudentProfile} from "./pages/student/profile/profile.component";
import {OrganismGuard} from "./guard/organism.guard";
import {StudentGuard} from "./guard/student.guard";
import {ExplorComponent} from "./components/explor/explor.component";
import {OrganismListComponent} from "./components/organism-list/organism-list.component";
import {NotLoggedInGuard} from "./guard/not-logged-in.guard";

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
    canActivate:  [NotLoggedInGuard],
  },
  {
    path: 'student/signup',
    component: SignupStudentComponent,
    pathMatch: 'full',
    canActivate:  [NotLoggedInGuard],
  },
  {
    path: 'explore',
    component: ExplorComponent,
    children: [
      {
        path: '',
        component: OrganismListComponent,
      }

    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:  [NotLoggedInGuard],
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
