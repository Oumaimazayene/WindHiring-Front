import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/pages/home/home.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { RegisterComponent } from "src/app/pages/register/register.component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // { path: "home", component: HomeComponent },
];
