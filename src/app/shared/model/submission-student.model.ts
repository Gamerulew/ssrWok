import { Moment } from 'moment';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';
import { IRunResult } from './run-result.model';
import { ILanguageBasic } from './basic-dto/language-basic.model';
import { IUserTeamBasic } from './basic-dto/userTeam-basic.model';
import { IScenarioBasic } from './basic-dto/scenario-basic.model';

export interface ISubmissionStudent {
  id?: number;
  submitTime?: Moment;
  difficultyLevelId?: string;
  exercise?: IExerciseBasic;
  runPercentA?: number;
  runPercentB?: number;
  runPercentC?: number;
  runPercentD?: number;
  starts?: number;
  runResult?: IRunResult;
  expectedResults?: string;
  cacheResultScoreExercise?: number;
  cacheResultScoreTopic?: number;
  cacheResultExercise?: string;
  cacheResultTopic?: string;
  language?: ILanguageBasic;
  userTeam?: IUserTeamBasic;
  helpScenario?: IScenarioBasic;
  color?: string;
  icon?: string;
  answer?: string;
}

export class SubmissionStudent implements ISubmissionStudent {
  constructor(
    public id?: number,
    public submitTime?: Moment,
    public difficultyLevelId?: string,
    public exercise?: IExerciseBasic,
    public runPercentA?: number,
    public runPercentB?: number,
    public runPercentC?: number,
    public runPercentD?: number,
    public starts?: number,
    public runResult?: IRunResult,
    public expectedResults?: string,
    public cacheResultScoreExercise?: number,
    public cacheResultScoreTopic?: number,
    public cacheResultExercise?: string,
    public cacheResultTopic?: string,
    public color?: string,
    public icon?: string,
    public answer?: string,
    public  language?: ILanguageBasic,
    public userTeam?: IUserTeamBasic,
    public helpScenario?: IScenarioBasic
  ) {
    this.icon = this.setIcon();
    this.color = this.setColor();
    this.starts = this.setStarts();
    this.answer = this.setAnswer();
  }

  public setStarts(): number {
    if (this.runPercentD) {
      if (this.runPercentD < 50 || (this.runPercentD > 50 && this.runPercentD < 100)) {
        return 0.5;
      }
      if (this.runPercentD === 100) {
        return 1;
      }
    }

    if (this.runPercentC) {
      if (this.runPercentC < 50 || (this.runPercentC > 50 && this.runPercentC < 100)) {
        return 1.5;
      }
      if (this.runPercentC === 100) {
        return 2;
      }
    }

    if (this.runPercentB) {
      if (this.runPercentB < 50 || (this.runPercentB > 50 && this.runPercentB < 100)) {
        return 2.5;
      }
      if (this.runPercentB === 100) {
        return 3;
      }
    }

    if (this.runPercentA) {
      if (this.runPercentA < 50 || (this.runPercentA > 50 && this.runPercentA < 100)) {
        return 3.5;
      }
      if (this.runPercentA === 100) {
        return 4;
      }
    }
    return 0;
  }

  public setColor(): string {
    if (this.runResult?.name === 'correct') {
      return 'green';
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

  public setIcon(): string {
    if (this.runResult?.name === 'correct') {
      return 'check';
    } else if (this.runResult?.name === 'no-output') {
      return 'bug_report';
    } else if (this.runResult?.name === 'run-error') {
      return 'priority_high';
    } else if (this.runResult?.name === 'timelimit') {
      return 'alarm';
    } else if (this.runResult?.name === 'unjudged') {
      return 'gavel';
    } else if (this.runResult?.name === 'wrong-answer') {
      return 'clear';
    }
    return 'close';
  }

  public setAnswer(): string {
    if (this.runResult?.name === 'correct') {
      return 'Correct';
    } else if (this.runResult?.name === 'no-output') {
      return 'No output';
    } else if (this.runResult?.name === 'run-error') {
      return 'Error';
    } else if (this.runResult?.name === 'timelimit') {
      return 'Time limit';
    } else if (this.runResult?.name === 'unjudged') {
      return 'No judging';
    } else if (this.runResult?.name === 'wrong-answer') {
      return 'Wrong answer';
    } else if (this.runResult?.name === 'compiler-error') {
      return 'Compiler error';
    }
    return 'Error';
  }
}
