import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { QuestionLogicService } from "src/app/service/question-logique/questions-logique.service"; // Assurez-vous d'importer le service approprié
import { ViewQuestionLogDialogComponent } from "./view-question-log-dialog/view-question-log-dialog.component";
import { questionLog } from "src/app/Models/questionLog";
import { AddQuestionLogDialogComponent } from "./add-question-log-dialog/add-question-log-dialog.component";
import { DeleteQuestionLogDialogComponent } from "src/app/pages/Question/questions-log/delete-question-log-dialog/delete-question-log-dialog.component";
@Component({
  selector: "app-questions-log",
  templateUrl: "./questions-log.component.html",
  styleUrls: ["./questions-log.component.scss"],
})
export class QuestionsLogComponent implements OnInit {
  questionsLogiques: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  pagedQuestions: questionLog[] = [];
  newQuestion: questionLog = {};
  filterText: string = "";
  filterType: string | null = null;
  filterDifficulty: string | null = null;
  difficulties: string[] = ["EASY", "MEDIUM", "HARD"];

  constructor(
    private questionLogicService: QuestionLogicService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions(): void {
    this.questionLogicService.getAll().subscribe(
      (questions) => {
        this.questionsLogiques = questions;
        this.totalItems = this.questionsLogiques.length;
        this.setPage(1);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération de toutes les questions logiques : ",
          error
        );
      }
    );
  }

  openViewQuestionDialog(id: number): void {
    this.questionLogicService.getQuestionLogiqueById(id).subscribe(
      (question) => {
        const dialogRef = this.dialog.open(ViewQuestionLogDialogComponent, {
          data: question,
        });

        dialogRef.afterClosed().subscribe(() => {});
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des détails de la question : ",
          error
        );
      }
    );
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedQuestions = this.questionsLogiques.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }

  openAddQuestionLogDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionLogDialogComponent);
    dialogRef
      .afterClosed()
      .subscribe(
        (formData: { imageFile: File; questionLogicDtoJson: string }) => {
          if (formData) {
            this.addQuestion(formData.imageFile, formData.questionLogicDtoJson);
          }
        }
      );
  }

  addQuestion(imageFile: File, questionLogicDtoJson: string): void {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("questionLogicDtoJson", questionLogicDtoJson);

    this.questionLogicService
      .addQuestionLogic(formData) // Pass formData instead of imageFile
      .subscribe(
        (response) => {
          this.getAllQuestions();
        },
        (error) => {
          console.error("Erreur lors de l'ajout de la question :", error);
        }
      );
  }
  deleteQuestion(id: number): void {
    this.questionLogicService.deleteQuestionLogic(id).subscribe(
      () => {
        console.log("Question logique supprimée avec succès");
        this.getAllQuestions();
      },
      (error) => {
        console.error(
          "Erreur lors de la suppression de la question logique :",
          error
        );
      }
    );
  }
  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteQuestionLogDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteQuestion(id);
      } else {
        console.log("Suppression annulée");
      }
    });
  }

  filterQuestions(): void {
    this.questionLogicService
      .getTypeNamesAndDiff(this.filterType, this.filterDifficulty)
      .subscribe(
        (filteredQuestions) => {
          this.questionsLogiques = filteredQuestions;
          this.totalItems = this.questionsLogiques.length;
          this.setPage(1);
        },
        (error) => {
          console.error(
            "Erreur lors du filtrage des questions logiques : ",
            error
          );
        }
      );
  }
}
