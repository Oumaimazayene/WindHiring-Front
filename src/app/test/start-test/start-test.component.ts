import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Answer } from "src/app/Models/Answer";
import { TestLogique } from "src/app/Models/TestLogique";
import { questionLog } from "src/app/Models/questionLog";
import { User } from "src/app/Models/user";
import { submittedQuestionlogique } from "src/app/Models/submittedQuestionlogique";
import { TypeService } from "src/app/service/type-service/type.service";
import { Type } from "src/app/Models/type";

@Component({
  selector: "app-start-test",
  templateUrl: "./start-test.component.html",
  styleUrls: ["./start-test.component.scss"],
})
export class StartTestComponent implements OnInit {
  tick = 1000;
  public editorBeautify: any;
  public languagesArray: any;
  public activatedTheme: string;
  public questionlength: any;
  public submittedQuestion: submittedQuestionlogique = {};

  public id: any;
  public counter: any;
  public questionList: questionLog[] = [];
  public currentQuestion: number = 0;
  public color: string = "black";
  public htmlContent: String = "";
  public questionType: any;
  public questionNumber: number = 0;
  public isCompleted: boolean = false;
  public repportQsFrm: submittedQuestionlogique = {};
  public cantReachServer = false;
  public submittedTest: TestLogique = {};
  public correctAnswers: any = [];
  public testSectionLog: TestLogique = {};
  public candidat: any;
  public event: any;
  public test: Answer[] = [];
  public qs: questionLog = {};
  public submittedQuestions: submittedQuestionlogique[] = [];

  public correct: boolean = false;
  public language: any;
  public i: number = 0;
  ended: boolean = false;
  public output$: any;
  public testTechnique: TestLogique = {};
  public createdby: User;
  public alreadySubmitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private typeService: TypeService
  ) {}

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.currentQuestion = 0;
    this.id = this.route.snapshot.paramMap.get("id");
    //  this.startTestSectionLog(this.id);
    this.color = "black";
  }

  // onTimerFinished(e: CountdownEvent) {
  //   if (e.action == "done") {
  //     this.counter = this.questionList[this.currentQuestion].time;
  //   } else if (e.action == "notify") {
  //     this.color = "red";
  //     console.log(e.action);
  //   }
  //   if (e.left === 0) {
  //     console.log(e.action);
  //     //this.submittedQuestion();

  //     this.color = "black";

  //     console.log(this.isCompleted);
  //     this.counter = this.questionList[this.currentQuestion].time;

  //     const typeId = this.questionList[this.currentQuestion].type_id;
  //     if (typeId) {
  //       this.typeService.getTypeById(typeId).subscribe((type: Type) => {
  //         this.questionType = type.name || "";
  //       });
  //     } else {
  //       this.questionType = "";
  //       this.submittedQuestions.push(this.questionList[this.currentQuestion]);
  //       this.htmlContent =
  //         this.questionList[this.currentQuestion].questionBody || "";
  //     }
  //   }
  // }

  nextQuestion() {
    this.verifyEnd();

    if (!this.submittedQuestion.candidateAnswer) {
      this.submittedQuestion.candidateAnswer = [
        { answer: "", isTrue: false, id: 0 },
      ];
      this.submittedQuestion.question = this.qs;
      this.repportQsFrm.question = this.submittedQuestion.question;
      this.repportQsFrm.candidateAnswer =
        this.submittedQuestion.candidateAnswer;
      this.repportQsFrm.isCorrect = false;
      this.repportQsFrm.qsScore = 0;
    }

    this.output$ = "";
    this.i = 0;
    this.submittedQuestion.candidateAnswer = [];
    this.qs = this.questionList[this.currentQuestion];
    this.counter = this.qs.time;
    this.correctAnswers = [];

    this.submittedQuestions.push(this.qs);

    const typeId = this.qs.type_id;
    if (typeId) {
      this.typeService.getTypeById(typeId).subscribe((type: Type) => {
        this.questionType = type.name || "";
      });
    } else {
      this.questionType = "";
    }

    this.submittedQuestion = {};
    this.htmlContent = this.qs.questionBody || "";
  }

  verifyEnd() {
    console.log(this.currentQuestion + 1, this.questionlength);
    if (this.currentQuestion === this.questionlength - 1) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
      this.currentQuestion++;
    }
  }
  // startTestSectionLog(id: any) {
  //   console.log(this.currentQuestion);
  //   this.submittedQuestions = [];
  //   //this.submittedQuestion.candidateAnswer=[{answer:"",isTrue:false,id:""}]
  //   this.service.startTest(id).subscribe(
  //     (res) => {
  //       this.createdby = res.createdBy;
  //       this.questionList = res.campagne.questionList;
  //       this.questionlength = this.questionList.length;
  //       this.test = [];
  //       //this.verifyEnd()
  //       this.qs = this.questionList[this.currentQuestion];
  //       this.submittedQuestions.push(this.qs);
  //       this.submittedQuestion.question = this.qs;
  //       this.language = res.campagne.domains;
  //       this.htmlContent = res.campagne.questionList[0].questionBody;
  //       this.counter = this.questionList[0].time;
  //       this.questionType =
  //         this.questionList[this.currentQuestion].qstType?.name;
  //       this.questionNumber = this.questionList.length;
  //       this.candidat = res.candidate;
  //     },
  //     (err) => {
  //       this.alreadySubmitted = true;
  //     }
  //   );
  // }

  endTest() {
    this.ended = true;
  }

  // submitQuestion() {
  //   this.submittedTest.createdBy = this.createdby;
  //   this.submittedTest.date = new Date();
  //   this.submittedTest.candidate = this.candidat;
  //   this.submittedTest.domains = this.language;
  //   this.submittedTest.questions.push(this.repportQsFrm);
  //   console.log("test", this.submittedTest);
  //   this.nextQuestion();
  //   if (this.isCompleted == false) {
  //     //  this.currentQuestion++;
  //     console.log("next...");
  //     this.ended = false;
  //   } else if (this.isCompleted == true) {
  //     this.ended = true;
  //     this.postTest();
  //   }
  // }

  // postTest(){
  //   console.log(this.currentQuestion+1 , this.questionlength)
  //   console.log("sending data...")
  //   this.service.submitTest(this.submittedTest).subscribe(res=>{
  //   })
  // }

  /* answer QCM question */
  // checkCheckBoxvalue(event:any,x:Answer,index:any){
  //   var eventClick:any;
  //   eventClick=event.target.checked
  //   if(this.i == 0){
  //     this.submittedQuestion.candidateAnswer=[]
  //     var answers=this.qs.answerList || []
  //     for(let a of answers){
  //       if(a.isTrue===true){
  //         this.correctAnswers.push(a)
  //       }
  //     }
  //     this.submittedQuestion.question=this.qs
  //   }
  //   if(eventClick==true){
  //     this.i++;
  //     this.submittedQuestion.candidateAnswer?.push(x)
  //     if(JSON.stringify(this.submittedQuestion.candidateAnswer) === JSON.stringify(this.correctAnswers)){
  //       this.correct=true
  //     }
  //     else{
  //       this.correct=false
  //     }
  //   }
  //   else if (eventClick == false){
  //     this.submittedQuestion.candidateAnswer?.forEach((element:any,index:any)=>{
  //       if(JSON.stringify(element) ===JSON.stringify(x)){
  //          if(this.submittedQuestion.candidateAnswer){
  //         this.submittedQuestion.candidateAnswer.splice(index,1);
  //        }
  //       }
  //       if(JSON.stringify(this.submittedQuestion.candidateAnswer) === JSON.stringify(this.correctAnswers)){
  //         this.correct=true
  //       }
  //       else{
  //         this.correct=false
  //       }
  //     })

  //   }

  //   if(this.correct){
  //     this.submittedQuestion.qsScore=this.qs.score
  //   }
  //   else{
  //     this.submittedQuestion.qsScore=0
  //   }
  //   this.repportQsFrm.question=this.submittedQuestion.question
  //   this.repportQsFrm.candidateAnswer =this.submittedQuestion.candidateAnswer
  //   this.repportQsFrm.isCorrect=this.correct
  //   this.repportQsFrm.qsScore=this.submittedQuestion.qsScore
  //   console.log("qcm : ",this.repportQsFrm)

  // }

  // questionExists(id:any) {
  //   return this.submittedQuestions.some(function(el) {
  //     return el.id === id;
  //   });
  // }
  //  textSubmit(){
  //   if(this.qs.answerList){
  //     // get correct answer
  //     this.correctAnswers = this.qs.answerList[0]
  //     /* candidates answer */
  //     const answer ={
  //       id:this.qs.answerList[0].id,
  //       answer:this.textAnswer.answer,
  //       isTrue:true
  //     }
  //     const answerss=[]
  //     answerss.push(answer)
  //     //console.log("text test",this.test)
  //     this.submittedQuestion.question=this.qs
  //     this.submittedQuestion.candidateAnswer=answerss
  //     this.submittedQuestions.push(this.submittedQuestion)
  //     console.log("cand answ", this.submittedQuestion.candidateAnswer)
  //         if(JSON.stringify(answer).toLocaleLowerCase() === JSON.stringify(this.correctAnswers).toLocaleLowerCase()){
  //         this.correct=true
  //       }
  //         else{
  //           this.correct=false
  //         }
  //           if(this.correct==true){
  //                 this.submittedQuestion.qsScore=this.qs.score
  //             }
  //             else{
  //               this.submittedQuestion.qsScore=0
  //             }
  //   }
  //             this.repportQsFrm.question=this.submittedQuestion.question
  //             this.repportQsFrm.candidateAnswer=this.submittedQuestion.candidateAnswer
  //             this.repportQsFrm.isCorrect=this.correct
  //             this.repportQsFrm.qsScore=this.submittedQuestion.qsScore
  //             console.log("testtttttt : ",this.submittedTest)
  //             //this.textAnswer.answer=""
  // }
}
