import { Moment } from 'moment';

export interface IUserResult {
  submitTime?: Moment;
  difficultyLevelId?: string;
  runPercentA?: number;
  runPercentB?: number;
  runPercentC?: number;
  runPercentD?: number;
  starts?: number;
  cacheResultScoreExercise?: number;
  cacheResultScoreTopic?: number;
  cacheResultLevelExercise?: string;
  cacheResultLevelTopic?: string;
  color?: string;
  icon?: string;
  answer?: string;
  idSubmission?: number;
  nameExercise?: string;
  idExercise?: number;
  slugExercise?: string;
  idRunResult?: string;
  descriptionExercise?: string;
  descriptionRunResult?: string;

  getColor(): string;

  getIcon(): string;

  getStarts(): number;

  getAnswer(): string;
}

export class UserResult implements IUserResult {
  constructor(
    public submitTime?: Moment,
    public difficultyLevelId?: string,
    public runPercentA?: number,
    public runPercentB?: number,
    public runPercentC?: number,
    public runPercentD?: number,
    public starts?: number,
    public cacheResultScoreExercise?: number,
    public cacheResultScoreTopic?: number,
    public cacheResultExercise?: string,
    public cacheResultTopic?: string,
    public color?: string,
    public icon?: string,
    public answer?: string,
    public idSubmission?: number,
    public nameExercise?: string,
    public idExercise?: number,
    public slugExercise?: string,
    public idRunResult?: string,
    public descriptionExercise?: string,
    public descriptionRunResult?: string
  ) {
    // console.warn(this)
    // this.icon = this.setIcon();
    // this.color = this.setColor();
    // this.starts = this.setStarts();
    // this.answer = this.setAnswer();
  }

  getStarts(): number {
    if (this.runPercentD) {
      if (
        this.runPercentD < 50 ||
        (this.runPercentD > 50 && this.runPercentD < 100)
      ) {
        return 0.5;
      }
      if (this.runPercentD === 100) {
        return 1;
      }
    }

    if (this.runPercentC) {
      if (
        this.runPercentC < 50 ||
        (this.runPercentC > 50 && this.runPercentC < 100)
      ) {
        return 1.5;
      }
      if (this.runPercentC === 100) {
        return 2;
      }
    }

    if (this.runPercentB) {
      if (
        this.runPercentB < 50 ||
        (this.runPercentB > 50 && this.runPercentB < 100)
      ) {
        return 2.5;
      }
      if (this.runPercentB === 100) {
        return 3;
      }
    }

    if (this.runPercentA) {
      if (
        this.runPercentA < 50 ||
        (this.runPercentA > 50 && this.runPercentA < 100)
      ) {
        return 3.5;
      }
      if (this.runPercentA === 100) {
        return 4;
      }
    }
    return 0;
  }

  getColor(): string {
    if (this.idRunResult === 'unjudged') {
      return 'secondary';
    }
    if (this.idRunResult === 'correct') {
      return 'success';
    }
    if (this.cacheResultTopic === 'B') {
      return 'info';
    }
    if (this.cacheResultTopic === 'C') {
      return 'warning';
    }
    if (this.cacheResultTopic === 'D' || this.cacheResultTopic === 'O') {
      return 'danger';
    }
    return 'danger';
    // if (this.result === 'correct') {
    //   return 'green';
    // } else if (this.result === 'no-output') {
    //   return 'secondary';
    // } else if (this.result === 'run-error') {
    //   return 'danger';
    // } else if (this.result === 'timelimit') {
    //   return 'secondary';
    // } else if (this.result === 'unjudged') {
    //   return 'info';
    // } else if (this.result === 'wrong-answer') {
    //   return 'danger';
    // }
    // return 'secondary';
  }

  getIcon(): string {
    if (this.idRunResult === 'unjudged') {
      return 'hourglass_empty';
    }
    if (this.idRunResult === 'correct') {
      return 'check';
    } else if (this.idRunResult === 'no-output') {
      return 'bug_report';
    } else if (this.idRunResult === 'run-error') {
      return 'priority_high';
    } else if (this.idRunResult === 'timelimit') {
      return 'alarm';
    } else if (this.idRunResult === 'unjudged') {
      return 'gavel';
    } else if (this.idRunResult === 'wrong-answer') {
      return 'clear';
    }
    return 'close';
  }

  getAnswer(): string {
    if (this.idRunResult === 'unjudged') {
      return 'Unjudged or judging';
    }
    // console.warn(this)
    // console.warn(this.runResult)
    if (this.idRunResult === 'correct') {
      return 'Correct';
    } else if (this.idRunResult === 'no-output') {
      return 'No output';
    } else if (this.idRunResult === 'run-error') {
      return 'Error';
    } else if (this.idRunResult === 'timelimit') {
      return 'Time limit';
    } else if (this.idRunResult === 'unjudged') {
      return 'No judging';
    } else if (this.idRunResult === 'wrong-answer') {
      return 'Wrong answer';
    } else if (this.idRunResult === 'compiler-error') {
      return 'Compiler error';
    }
    return 'Error';
  }
}
