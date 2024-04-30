import { Component, OnInit } from "@angular/core";
import { QuestionsTechService } from "../../../service/question-tech/questions-tech.service";
import { questionTech } from "../../../Models/questionTech";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { AddQuestionTechDialogComponent } from "./add-question-tech-dialog/add-question-tech-dialog.component";
import { DeleteQuestionTechDialogComponent } from "./delete-question-tech-dialog/delete-question-tech-dialog.component";
import { AfficheQuestionTechDialogComponent } from "./affiche-question-tech-dialog/affiche-question-tech-dialog.component";

@Component({
  selector: "app-questions-tech",
  templateUrl: "./questions-tech.component.html",
  styleUrls: ["./questions-tech.component.scss"],
})
export class QuestionsTechComponent implements OnInit {
  questionsTech: questionTech[] = [];
  pagedQuestions: questionTech[] = [];
  newQuestion: questionTech = {};
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  constructor(
    private questionsTechService: QuestionsTechService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllQuestionsTech();
  }

  getAllQuestionsTech(): void {
    this.questionsTechService.getAll().subscribe(
      (data: questionTech[]) => {
        this.questionsTech = data;
        this.totalItems = this.questionsTech.length;
        this.setPage(1);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des questions techniques : ",
          error
        );
      }
    );
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedQuestions = this.questionsTech.slice(startIndex, endIndex);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }
  refreshQuestion(): void {
    this.setPage(this.currentPage);
  }
  addQuestion(newQuestion: questionTech): void {
    this.questionsTechService.addQuestionTech(newQuestion).subscribe(
      (response) => {
        console.log("Question ajoutée avec succès : ", response);
        // Réinitialisez le formulaire ici si nécessaire
        this.getAllQuestionsTech();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la question : ", error);
      }
    );
  }

  openAddQuestionTechDialog(): void {
    const dialogRef = this.dialog.open(AddQuestionTechDialogComponent);
    dialogRef.afterClosed().subscribe((newQuestion: questionTech) => {
      if (newQuestion) {
        this.addQuestion(newQuestion);
      }
    });
  }

  deleteQuestion(id: number): void {
    this.questionsTechService.deleteQuestionTech(id).subscribe(
      () => {
        console.log("Question supprimée avec succès");
        this.getAllQuestionsTech();
      },
      (error) => {
        console.error("Erreur lors de la suppression de la question : ", error);
      }
    );
  }

  openDeleteQuestionDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteQuestionTechDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteQuestion(id);
      } else {
        console.log("Suppression annulée");
      }
    });
  }
  openViewQuestionDialog(id: number): void {
    this.questionsTechService.getQuestionTechById(id).subscribe(
      (question: questionTech[]) => {
        const dialogRef = this.dialog.open(AfficheQuestionTechDialogComponent, {
          data: question,
        });
        console.log("question", question);

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
}