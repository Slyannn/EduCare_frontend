import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
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
    path: 'explorer',
    component: ExplorePageComponent,
    pathMatch: 'full',
    children : [
      
    ]
  },
  {
    path : 'details/:orga', 
    component: DetailsPageComponent, 
    pathMatch: 'full',
  }
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
