import { Component, OnInit } from "@angular/core";
import { TestSectionLogiqueService } from "src/app/service/testSection_logique-service/test-section-logique-service.service";
import { TestSectionLogique } from "src/app/Models/TestSectionLogique";
import { UserService } from "src/app/service/user-service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { AddTestSectionDialogComponent } from "./add-test-section-dialog/add-test-section-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { questionLog } from "src/app/Models/questionLog";
import { Observable, catchError, throwError } from "rxjs";
import { TestService } from "src/app/service/test-service/test.service";
import { AddTestLogiqueComponent } from "./add-test-logique/add-test-logique.component";

@Component({
  selector: "app-test-section-logique",
  templateUrl: "./test-section-logique.component.html",
  styleUrls: ["./test-section-logique.component.scss"],
})
export class TestSectionLogiqueComponent implements OnInit {
  testSectionsLog: TestSectionLogique[];
  userUUID: string;
  pagedTestSection: TestSectionLogique[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  newSection: TestSectionLogique = {};

  constructor(
    private testSectionLogiqueService: TestSectionLogiqueService,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.getTestSectionsByUserUUID(uuid);
  }

  getTestSectionsByUserUUID(userUUID: string): void {
    this.testSectionLogiqueService
      .getTestSectionsByUserUUID(userUUID)
      .subscribe((data) => {
        this.testSectionsLog = data;
        this.totalItems = this.testSectionsLog.length;
        this.setPage(1);
        console.log("testsection", this.testSectionsLog);
      });
  }
  handleIconClick(testSectionId: number): void {
    this.router.navigate(["/questionprive-log", testSectionId]);
  }
  createTestSection(newSection: TestSectionLogique): void {
    const uuid = this.authService.extractUUIDFromToken();
    this.testSectionLogiqueService
      .createTestSection(newSection, uuid)
      .subscribe((data) => {
        console.log("Section de test créée :", data);
        this.getTestSectionsByUserUUID(uuid);
        this.getTestSectionsByUserUUID(uuid);
      });
  }

  openAddQuestionTechDialog(): void {
    const dialogRef = this.dialog.open(AddTestSectionDialogComponent);
    dialogRef.afterClosed().subscribe((newSection: TestSectionLogique) => {
      if (newSection) {
        this.createTestSection(newSection);
      }
    });
  }

  deleteTestSection(id: number): void {
    this.testSectionLogiqueService.deleteTestSection(id).subscribe((data) => {
      console.log(data);
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedTestSection = this.testSectionsLog.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedDate;
  }

  deleteAllTestSection(): void {
    this.testSectionLogiqueService.deleteAllTestSection().subscribe((data) => {
      console.log(data);
    });
  }

  getPrivateQuestions(testSectionId: number): Observable<questionLog[]> {
    return this.testSectionLogiqueService
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

  openAddTestLogDialog(testSectionUUID: string): void {
    const dialogRef = this.dialog.open(AddTestLogiqueComponent, {
      data: { testSectionUUID },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { size: number; privateqts: number } | undefined) => {
        if (result) {
          this.createTestLog(testSectionUUID, result.size, result.privateqts);
        }
      });
  }

  createTestLog(
    testSectionUUID: string,
    size: number,
    privateqts: number
  ): void {
    this.testService.createTestLog(testSectionUUID, size, privateqts).subscribe(
      (data) => {
        console.log("Test logique créé :", data);
      },
      (error) => {
        console.error("Erreur lors de la création du test logique :", error);
        console.log("testsectionlogiqueuuid", testSectionUUID);
        console.log("size", size);
        console.log("private", privateqts);
      }
    );
  }
}
