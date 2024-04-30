import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { StartTestComponent } from "./start-test/start-test.component";
import { MatToolbarModule } from "@angular/material/toolbar";

const routes: Routes = [{ path: "test-start", component: StartTestComponent }];

@NgModule({
  declarations: [StartTestComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule.forChild(routes)],
})
export class TestModule {}
