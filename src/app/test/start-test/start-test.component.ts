import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Answer } from "src/app/Models/Answer";
import { questionLog } from "src/app/Models/questionLog";
import { submittedQuestionlogique } from "src/app/Models/submittedQuestionlogique";
import { TestService } from "src/app/service/test-service/test.service";
import { CountdownEvent, CountdownComponent } from "ngx-countdown";


@Component({
  selector: "app-start-test",
  templateUrl: "./start-test.component.html",
  styleUrls: ["./start-test.component.scss"],
})
export class StartTestComponent implements OnInit {
  @ViewChild("countdown", {
    static: false,
  })
  countdown: CountdownComponent;

  tick = 1000;
  public id: any;
  public counter: any;
  public questionList: questionLog[] = [];
  public color: string = "black";
  public htmlContent: String = "";
  public questionType: any;
  public isCompleted: boolean = false;
  public submittedQuestions: submittedQuestionlogique[] = [];
  public currentQuestionIndex: number = 0;
  public currentQuestion: any | undefined;
  public submittedQuestion: submittedQuestionlogique;
  public correctAnswers: any = [];
  public alreadySubmitted: boolean = false;
  public ended: boolean = false;
  public showAnswerSection: boolean = false;
  public allQuestionsAnswered: boolean = false;
  public successMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("testId récupéré depuis l'URL :", this.id);
    this.color = "black";
    this.testService.getTestById(this.id).subscribe(
      (response) => {
        this.questionList = response.questions;
        if (this.questionList.length > 0) {
          this.currentQuestion = this.questionList[this.currentQuestionIndex];
          this.counter = this.currentQuestion.time;
          this.questionType = this.currentQuestion.type.name;
          console.log("currentQuestion:", this.currentQuestion);
          console.log("questionType:", this.questionType);
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    );
  }

  endTest() {
    const candidateReponseDtos = this.submittedQuestions;

    this.testService
      .generateTestReport(this.id, candidateReponseDtos)
      .subscribe(
        (response) => {
          console.log("Rapport généré avec succès :", response);
          this.alreadySubmitted = true;
          this.ended = true;
        },
        (error) => {
          console.error("Erreur lors de la génération du rapport :", error);
        }
      );

    this.isCompleted = true;
  }
  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      const submittedQuestionIndex = this.submittedQuestions.findIndex(
        (sq) => sq.idQuestion === this.currentQuestion.id
      );

      if (submittedQuestionIndex === -1) {
        const submittedQuestion: submittedQuestionlogique = {
          idQuestion: this.currentQuestion.id,
          reponses: [],
        };
        this.submittedQuestions.push(submittedQuestion);
      }

      // Passer à la question suivante
      this.currentQuestionIndex++;
      this.currentQuestion = this.questionList[this.currentQuestionIndex];
      this.counter = this.currentQuestion.time;
      this.showAnswerSection = false;
    } else {
      this.allQuestionsAnswered = true;
    }
  }

  onTimerFinished(e: CountdownEvent) {
    if (e.action === "done") {
      console.log("Temps écoulé. Passage à la question suivante...");
      this.checkAndSubmitAnswer();
    } else if (e.action === "notify") {
      this.color = e.left <= 10000 ? "red" : "inherit";
    }

    if (e.left === 0) {
      console.log("Temps écoulé. Passage à la question suivante...");
      this.checkAndSubmitAnswer();
      this.color = "black";
      this.counter = this.questionList[this.currentQuestionIndex].time;
    }
  }

  checkAndSubmitAnswer() {
    if (
      this.submittedQuestion &&
      this.submittedQuestion.reponses.length === 0
    ) {
      this.submittedQuestion = {
        idQuestion: this.currentQuestion.id,
        reponses: null,
      };
      if (
        !this.submittedQuestions.some(
          (sq) => sq.idQuestion === this.currentQuestion.id
        )
      ) {
        this.submittedQuestions.push(this.submittedQuestion);
      }
    }
    this.goToNextQuestion();
  }

  submitQuestion(questionId: any, answer: string) {
    const submittedQuestion: submittedQuestionlogique = {
      idQuestion: questionId,
      reponses: answer ? [answer] : [],
    };

    const existingIndex = this.submittedQuestions.findIndex(
      (sq) => sq.idQuestion === questionId
    );

    if (existingIndex !== -1) {
      this.submittedQuestions[existingIndex] = submittedQuestion;
    } else {
      this.submittedQuestions.push(submittedQuestion);
    }

    console.log("submittedQuestions :", this.submittedQuestions);
  }

  checkCheckBoxvalue(event: any, x: Answer, index: any) {
    const eventClick = event.target.checked;
    if (this.questionType === "qcu") {
      if (eventClick) {
        const submittedQuestion: submittedQuestionlogique = {
          idQuestion: this.currentQuestion.id,
          reponses: [x.answer],
        };

        const indexToRemove = this.submittedQuestions.findIndex(
          (sq) => sq.idQuestion === this.currentQuestion.id
        );
        if (indexToRemove !== -1) {
          this.submittedQuestions.splice(indexToRemove, 1);
        }
        this.submittedQuestions.push(submittedQuestion);
      } else {
        const indexToRemove = this.submittedQuestions.findIndex(
          (sq) => sq.idQuestion === this.currentQuestion.id
        );
        if (indexToRemove !== -1) {
          this.submittedQuestions.splice(indexToRemove, 1);
        }
      }
    } else {
      console.error("Le type de question n'est pas pris en charge.");
    }

    console.log("submittedQuestions :", this.submittedQuestions);
  }

  checkCheckBoxvalueQCM(event: any, x: Answer, index: any) {
    const eventClick = event.target.checked;

    if (eventClick) {
      if (
        !this.submittedQuestions.some(
          (sq) => sq.idQuestion === this.currentQuestion.id
        )
      ) {
        this.submittedQuestions.push({
          idQuestion: this.currentQuestion.id,
          reponses: [x.answer],
        });
      }
    } else {
      const indexToRemove = this.submittedQuestions.findIndex(
        (sq) => sq.idQuestion === this.currentQuestion.id
      );
      if (indexToRemove !== -1) {
        this.submittedQuestions.splice(indexToRemove, 1);
      }
    }

    console.log("submittedQuestions :", this.submittedQuestions);
  }
  testSubmit() {
    const existingIndex = this.submittedQuestions.findIndex(
      (question) => question.idQuestion === this.currentQuestion.id
    );

    if (existingIndex !== -1) {
      if (
        this.submittedQuestion &&
        Array.isArray(this.submittedQuestion.reponses) &&
        this.submittedQuestion.reponses.length > 0
      ) {
        this.submittedQuestions[existingIndex].reponses =
          this.submittedQuestion.reponses;
      }
    } else {
      const submittedQuestion: submittedQuestionlogique = {
        idQuestion: this.currentQuestion.id,
        reponses: this.submittedQuestion.reponses
          ? this.submittedQuestion.reponses
          : [],
      };
      this.submittedQuestions.push(submittedQuestion);
    }

    this.submittedQuestion = {
      idQuestion: 0,
      reponses: [],
    };

    console.log("submittedQuestions :", this.submittedQuestions);

    if (this.isLastQuestion()) {
      this.endTest();
    } else {
      this.goToNextQuestion();
    }
  }
  generateReport() {
    this.testService
      .generateFreemarkerTestReport(this.id, this.submittedQuestions)
      .subscribe(
        (response) => {
          try {
            const contentType = response.headers
              .get("content-type")
              ?.toLowerCase();
            if (contentType && contentType.includes("application/json")) {
              const jsonResponse = JSON.parse(response.text());
            } else {
              console.log(response.text());
            }
          } catch (error) {
            console.error("Erreur lors de la génération du rapport :", error);
          }
        },
        (error) => {
          console.error("Erreur lors de la génération du rapport :", error);
        }
      );
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questionList.length - 1;
  }
}
