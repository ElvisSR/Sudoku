import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './public/landing-page/landing-page.component';
import { RegistrationFormComponent } from './public/registration-form/registration-form.component';
import { LoginComponent } from './public/login/login.component';
import { SudokuComponent } from './sudoku/sudoku/sudoku.component';
import { MainSudokuComponent } from './registered/main-sudoku/main/main-sudoku.component';
import { MainGuard } from './guards/MainGuard';
import { MainGuestComponent } from './public/main-guest/main-guest/main-guest.component';
import { PerfilComponent } from './registered/perfil/perfil.component';


const routes: Routes = [
  {path: "", component: LandingPageComponent},
  {path: "guest", component: MainGuestComponent},
  {path: "registration", component: RegistrationFormComponent},
  {path: "login", component: LoginComponent},
  {path: "main", component: MainSudokuComponent, canActivate:[MainGuard]},
  {path: "perfil", component: PerfilComponent, canActivate:[MainGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
