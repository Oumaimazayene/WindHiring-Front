import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { StartTestComponent } from "./start-test/start-test.component";
import { CodeComponent } from "./code/code.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CountdownModule } from "ngx-countdown";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "test-start/:id", component: StartTestComponent },
  { path: "edit-code", component: CodeComponent },
];

@NgModule({
  declarations: [StartTestComponent, CodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    CountdownModule,
    RouterModule.forChild(routes),
  ],
})
export class TestModule {}
