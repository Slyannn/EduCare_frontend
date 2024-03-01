import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent as SignupOrganismComponent } from './pages/organism/signup/signup.component';
import { SignupComponent as SignupStudentComponent } from './pages/student/signup/signup.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './pages/student/profile/profile.component';
import {MatDividerModule} from '@angular/material/divider';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { ExplorComponent } from './components/explor/explor.component';
import { OrganismListComponent } from './components/organism-list/organism-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {StudentGuard} from "./guard/student.guard";
import {OrganismGuard} from "./guard/organism.guard";
import { DetailsComponent } from './components/details/details.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignupOrganismComponent,
    SignupStudentComponent,
    LoginComponent,
    ProfileComponent,
    ExplorComponent,
    OrganismListComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: [STEPPER_GLOBAL_OPTIONS, StudentGuard, OrganismGuard],
      useValue: {showError: true},
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
