import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { UserComponent } from "src/app/pages/user/user.component";
import { DomainsComponent } from "src/app/pages/domains/domains.component";
import { QuestionsLogComponent } from "src/app/pages/Question/questions-log/questions-log.component";
import { QuestionsTechComponent } from "src/app/pages/Question/questions-tech/questions-tech.component";
import { TestSectionLogiqueComponent } from "src/app/pages/TestSection/test-section-logique/test-section-logique.component";
import { QuestionpriveLogComponent } from "src/app/pages/QuestionPrivée/QuestionLogiquePri/questionprive-log/questionprive-log.component";
import { AuthGuardService } from "src/app/service/auth-guard.service";
import { TestSectionTechComponent } from "src/app/pages/TestSection/TestSection -Tech/test-section-tech/test-section-tech.component";
import { QuestionTechPriveComponent } from "src/app/pages/QuestionPrivée/QuestionTech/question-tech-prive/question-tech-prive.component";
import { ListTestComponent } from "../../pages/TestSection/list-test/list-test.component";
import { ListTestTechComponent } from "src/app/pages/TestSection/TestSection -Tech/list-test-tech/list-test-tech.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "liste-des-utilisateurs",
    component: UserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "liste-des-domaines",
    component: DomainsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "questions-logiques",
    component: QuestionsLogComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "questions-techniques",
    component: QuestionsTechComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "testSection-Logique",
    component: TestSectionLogiqueComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "testSection-Technique",
    component: TestSectionTechComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "questionprive-log/:id",
    component: QuestionpriveLogComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "questionprivee-Tech/:id",
    component: QuestionTechPriveComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "liste-des-Tests/:testSectionUUID",
    component: ListTestComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "liste-des-Tests-Tech/:testSectionUUID",
    component: ListTestTechComponent,
    canActivate: [AuthGuardService],
  },
];
