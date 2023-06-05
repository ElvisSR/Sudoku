import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './public/landing-page/landing-page.component';
import { RegistrationFormComponent } from './public/registration-form/registration-form.component';
import { LoginComponent } from './public/login/login.component';
import { SudokuComponent } from './sudoku/sudoku/sudoku.component';
import { MainSudokuComponent } from './registered/main-sudoku/main-sudoku.component';
import { MainGuard } from './guards/MainGuard';


const routes: Routes = [
  {path: "", component: LandingPageComponent},
  {path: "registration", component: RegistrationFormComponent},
  {path: "login", component: LoginComponent},
  {path: "main", component: MainSudokuComponent, canActivate:[MainGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
