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
import {ConfirmAccountComponent} from "./components/activation/confirm-account/confirm-account.component";
import {ConfirmAccountGuard} from "./guard/confirm-account.guard";
import {UpdateComponent} from "./pages/student/update/update.component";
import {UpdateOrganismComponent} from "./pages/organism/update-organism/update-organism.component";
import {ReviewComponent} from "./pages/organism/review/review.component";

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
    path: 'activation',
    component: ConfirmAccountComponent,
    pathMatch: 'full',
    canActivate:  [ConfirmAccountGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:  [NotLoggedInGuard],
  },
  {
    path: 'organism/profile/:name',
    component: OrganismProfile,
    pathMatch: 'full',
   // canActivate:[OrganismGuard],
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
  },
  {
    path: 'student/update/:token',
    component: UpdateComponent,
    pathMatch: 'full',
    canActivate:[StudentGuard],
  },
  {
    path: 'organism/update/:token',
    component: UpdateOrganismComponent,
    pathMatch: 'full',
    canActivate:[OrganismGuard],
  },
  {
    path: 'organism/review/:name',
    component: ReviewComponent,
    pathMatch: 'full',
    canActivate:[OrganismGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
