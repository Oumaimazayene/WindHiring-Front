import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterResponseComponent } from "./register-response/register-response.component";
import { Routes } from "@angular/router";

const routes: Routes = [
  { path: "/Home", component: RegisterResponseComponent },
];

@NgModule({
  declarations: [RegisterResponseComponent],
  imports: [CommonModule],
})
export class RegisterResponseModule {}
