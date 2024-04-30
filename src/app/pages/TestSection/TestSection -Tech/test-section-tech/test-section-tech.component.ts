import { Component, OnInit } from "@angular/core";
import { TestSectionTech } from "src/app/Models/testSection-Tech";
import { AuthService } from "src/app/service/auth.service";
import { TestSectionTechServiceService } from "src/app/service/TestSection-Tech-Service/test-section-tech-service.service";
import { ViewTestSectionTechDialogComponent } from "../view-test-section-tech-dialog/view-test-section-tech-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddTestSectionTechDialogComponent } from "../add-test-section-tech-dialog/add-test-section-tech-dialog.component";
import { questionTech } from "src/app/Models/questionTech";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-test-section-tech",
  templateUrl: "./test-section-tech.component.html",
  styleUrls: ["./test-section-tech.component.scss"],
})
export class TestSectionTechComponent implements OnInit {
  userUUID: string;
  testSectionTech: TestSectionTech[];
  pagedTestSection: TestSectionTech[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  newSection: TestSectionTech = {};
  constructor(
    private authService: AuthService,
    private testSectionTechService: TestSectionTechServiceService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.getTestSectionsByUserUUID(uuid);
  }

  getTestSectionsByUserUUID(userUUID: string): void {
    this.testSectionTechService
      .getTestSectionsByUserUUID(userUUID)
      .subscribe((data) => {
        this.testSectionTech = data;
        this.totalItems = this.testSectionTech.length;
        this.setPage(1);
        console.log("testsection", this.testSectionTech);
      });
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedTestSection = this.testSectionTech.slice(startIndex, endIndex);
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }

  createTestSection(newSection: any): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.testSectionTechService
      .createTestSection(newSection, uuid)
      .subscribe((data) => {
        console.log("Section de test créée :", data);
        this.getTestSectionsByUserUUID(uuid);
      });
  }

  openViewTestSectionTechDialog(id: number): void {
    this.testSectionTechService.getTestSectionById(id).subscribe(
      (testSectionTech) => {
        const dialogRef = this.dialog.open(ViewTestSectionTechDialogComponent, {
          data: testSectionTech,
        });
        console.log("id", this.testSectionTech);

        dialogRef.afterClosed().subscribe(() => {});
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des détails de test section tech  : ",
          error
        );
      }
    );
  }

  openAddTestSectionTech(): void {
    const dialogRef = this.dialog.open(AddTestSectionTechDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: TestSectionTech | undefined) => {
      if (result) {
        this.createTestSection(result);
      }
    });
  }
  getPrivateQuestions(testSectionId: number): Observable<questionTech[]> {
    return this.testSectionTechService
      .getPrivateQuestionsByTestSectionId(testSectionId)
      .pipe(
        catchError((error) => {
          console.error(
            "Une erreur est survenue lors de la récupération des questions privées :",
            error
          );
          return throwError(
            "Erreur lors de la récupération des questions privées. Veuillez réessayer plus tard."
          );
        })
      );
  }
  handleIconClick(testSectionId: number): void {
    this.router.navigate(["/questionprivee-Tech", testSectionId]);
  }
}
