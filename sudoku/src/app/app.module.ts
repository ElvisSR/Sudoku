import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './public/landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarPublicComponent } from './public/navbar-public/navbar-public.component';
import { SudokuComponent } from './sudoku/sudoku/sudoku.component';
import { MainSudokuComponent } from './registered/main-sudoku/main/main-sudoku.component';
import { RegistrationFormComponent } from './public/registration-form/registration-form.component';
import { LoginComponent } from './public/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './registered/perfil/perfil.component';
import { MainGuestComponent } from './public/main-guest/main-guest/main-guest.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarPublicComponent,
    SudokuComponent,
    MainSudokuComponent,
    RegistrationFormComponent,
    LoginComponent,
    PerfilComponent,
    MainGuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
