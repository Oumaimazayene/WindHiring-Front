import { Answer } from "./Answer";
import { questionLog } from "./questionLog";

export class submittedQuestionlogique {
  id?: number;
  question?: questionLog;
  candidateAnswer?: Answer[];
  isCorrect?: Boolean;
  qsScore?: number;
}
