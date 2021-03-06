import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Moment} from 'moment';
import * as moment from 'moment-timezone';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from "@angular/router";
import {TopicService} from "../../shared/services/topic.service";
import {AddCourseDialogComponent} from "../add-course-dialog/add-course-dialog.component";
import {IModuleTopic, ModuleTopic} from "../../shared/model/module-topic.model";
import {IDisciplineTopic} from "../../shared/model/discipline-topic.model";
import {ITopic} from "../../shared/model/topic.model";
import {SharedFunctions} from "../../shared/shared.functions";
import {AccountService} from "../../core/auth/account.service";
import {ModuleBasic} from "../../shared/model/basic-dto/module-basic.model";
import {RegisterComponent} from "../../shared/register/register.component";

@Component({
  selector: 'wok-topics-tree',
  templateUrl: 'topics-tree.component.html'
})
export class TopicsTreeComponent implements OnInit, OnChanges {
  @Input() topicByLevel?: IModuleTopic[][];
  @Input() topicByLevelDiscipline?: IDisciplineTopic[][]; // Preparação para Unir Coponentes
  @Input() userScore!: number;
  @Input() courseId?: number;
  @Input() passcode?: string;
  @Input() hasHighAccess?: boolean = undefined;
  @Output() selectedTopicContent: EventEmitter<number> = new EventEmitter<number>();

  completeTree = false;
  topic?: ITopic;
  currentDate?: Date;
  routePrefix?: string;
  redirect = false;

  configs?: {
    startTime?: Moment;
    activeTime?: Moment;
    maxGrade?: boolean;
    targetScore?: number;
    minScore?: number;
    endTime?: Moment;
    deactiveTime?: Moment;
  };

  constructor(
    protected topicService: TopicService,
    protected modalService: NgbModal,
    public sharedFunctions: SharedFunctions,
    protected activatedRoute: ActivatedRoute,
    public accountService: AccountService,
    public dialog: MatDialog,
  ) {
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    // Médito que seria usado no caso de Transformar Componente em Genérico para DisciplineTopic
    if (this.topicByLevelDiscipline === undefined) {
      this.completeTree = true;
    } else {
      this.topicByLevelDiscipline.forEach((disciplineArray: IDisciplineTopic[], keyLevel) => {
        disciplineArray.forEach((discipline: IDisciplineTopic, key) => {
          if (this.topicByLevel) {
            this.topicByLevel[keyLevel][key] = new ModuleTopic(
              new ModuleBasic(),
              discipline.topic,
              0,
              discipline.maxGrade,
              discipline.targetScore,
              discipline.minScore
            );
          }
        });
      });

      this.completeTree = false;
    }

    this.currentDate = new Date();
    this.userScore = 1000;
    this.activatedRoute.params.subscribe(params => {
      if (params.courseSlug && params.disciplineSlug) {
        this.routePrefix = `/${this.hasHighAccess ? 'teacher' : 'account'}/classroom/${params.courseSlug}/module/${params.disciplineSlug}/topic`;
        this.redirect = true;
      } else if (params.trainingSlug) {
        this.routePrefix = `/${this.hasHighAccess ? 'teacher' : 'account'}/classroom/${params.trainingSlug}`;
      } else {
        this.routePrefix = undefined;
      }
    });
  }

  selectTopicContent(selectedTopic: number | undefined): void {
    if (selectedTopic) {
      this.selectedTopicContent.emit(selectedTopic);
    }
  }

  public dateEndCompare(endTime?: Moment): boolean {
    const currentDate = moment();
    return moment(endTime).isBefore(currentDate);
  }


  dateStartCompare(startTime?: Moment, endTime?: Moment): boolean {
    const currentDate = moment();
    if (startTime && endTime) {
      return moment(currentDate).isBetween(startTime, endTime);
    }
    return false;
  }

  convertData(date?: Moment): Moment {
    return moment.tz(date, Intl.DateTimeFormat().resolvedOptions().timeZone);
  }

  openDialog(): void {
    const data = {
      prefix: this.routePrefix,
      courseId: this.courseId,
      passcode: this.passcode
    };
    this.dialog.open(RegisterComponent, {
      width: '500px',
      data
    });
  }

  openAddCourseDialog(moduleId?: number): void {
    const routePrefix = this.routePrefix;
    if (moduleId) {
      this.dialog.open(AddCourseDialogComponent, {
        width: '500px',
        data: {moduleId, routePrefix}
      });
    }
  }

  verifyInvalidData(element: IModuleTopic): boolean {
    return !element?.startTime || !element?.endTime || !element?.activeTime || !element?.deactiveTime;
  }

  // getRandomInt(): number {
  //   return Math.floor(Math.random() * Math.floor(101));
  // }
}
