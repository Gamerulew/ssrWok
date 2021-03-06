import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from "rxjs";
import {ICourse} from "../../../shared/model/course.model";
import {IExerciseBasic} from "../../../shared/model/basic-dto/exercise-basic.model";
import {ISubmissionBasic} from "../../../shared/model/basic-dto/submission-basic.model";
import {IModuleTopic} from "../../../shared/model/module-topic.model";
import {IUserStorage} from "../../../shared/model/userStorage.model";
import {SharedFunctions} from "../../../shared/shared.functions";
import {AccountService} from "../../../core/auth/account.service";
import {SessionStorageService} from "ngx-webstorage";
import {CourseService} from "../../../shared/services/course.service";
import {ModuleTopicService} from "../../../shared/services/module-topic.service";
import {TopicService} from "../../../shared/services/topic.service";
import {ExerciseService} from "../../../shared/services/exercise.service";
import {Authority} from "../../../shared/constants/authority.constants";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'wok-dashboard2',
  templateUrl: './user-team-classroom.component.html',
  styleUrls: ['./user-team-classroom.component.scss'],
})
export class UserTeamClassroomComponent implements OnInit {
  course!: ICourse;
  courseSlug?: string;
  disciplineSlug?: string;
  moduleId?: number;
  topicId?: number;
  courseId?: number;
  exerciseId?: number;
  topicSlug?: string;
  selectedTopicHistoric!: number;
  selectedTopicExercises!: IExerciseBasic[];
  exerciseSlug?: string;
  selectedTab = 0;
  showResults = false;
  selectedTopicContent!: number;
  submissions!: ISubmissionBasic[];
  topicByLevel: IModuleTopic[][] = [];
  isRegistered?: boolean = undefined;
  MathJax: any;
  userStorage?: IUserStorage;
  hasHighAccess?: boolean;
  routePrefix?: string;
  routeSuffix?: string;
  // Subscribers
  courseId$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public sharedFunctions: SharedFunctions,
    public accountService: AccountService,
    private sessionStorage: SessionStorageService,
    protected courseService: CourseService,
    private moduleTopicService: ModuleTopicService,
    private exerciseService: ExerciseService,
    private topicService: TopicService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.userStorage = this.sessionStorage.retrieve('account');
    this.activatedRoute.params.subscribe((params: any) => {
      if (params) {
        if (params.courseSlug) {
          this.courseSlug = params.courseSlug;
        }
        if (params.disciplineSlug) {
          this.disciplineSlug = params.disciplineSlug;
          this.selectedTab = 1;
        }
        if (params.topicSlug) {
          this.topicSlug = params.topicSlug;
        }
        if (params.exerciseSlug) {
          this.exerciseSlug = params.exerciseSlug;
          this.selectedTab = 4;
        }
      }
      this.activatedRoute.data.subscribe((data) => {
        this.hasHighAccess =
          data.accessType === 'teacher' || this.accountService.isAdmin();
        this.routePrefix = `/${data.accessType}`;
        this.routeSuffix = data.routeSuffix;
        if (this.routeSuffix === 'history') {
          this.selectedTab = 2;
        } else if (this.routeSuffix === 'exercises') {
          this.selectedTab = 3;
        }
        this.getCourseId();
        this.getModuleId();
        this.getTopicId();
        this.getExerciseId();
        if (!this.disciplineSlug) {
          this.userRegistered();
        }
      });
    });
  }

  getCourseId(): void {
    if (this.courseSlug) {
      this.courseId$ = this.courseService
        .getCourseId(
          this.courseSlug,
          this.hasHighAccess ? Authority.TEACHER : Authority.USER
        )
        .subscribe({
          next: (res: HttpResponse<number>) => (this.courseId = res.body || 0),
        });
    }
  }

  getModuleId(): void {
    if (this.courseSlug && this.disciplineSlug) {
      this.moduleTopicService
        .getModuleId(
          this.courseSlug,
          this.disciplineSlug,
          this.hasHighAccess ? Authority.TEACHER : Authority.USER
        )
        .subscribe({
          next: (res: HttpResponse<number>) => (this.moduleId = res.body || 0),
        });
    }
  }

  getTopicId(): void {
    if (this.topicSlug) {
      this.topicService
        .getTopicId(
          this.topicSlug,
          this.hasHighAccess ? Authority.TEACHER : Authority.USER
        )
        .subscribe({
          next: (res: HttpResponse<number>) => (this.topicId = res.body || 0),
        });
    }
  }

  getExerciseId(): void {
    if (this.exerciseSlug) {
      this.exerciseService.getExerciseId(this.exerciseSlug).subscribe({
        next: (res: HttpResponse<number>) => (this.exerciseId = res.body || 0),
      });
    }
  }

  userRegistered(): void {
    if (this.courseSlug && this.userStorage?.id) {
      this.courseService?.findCoursesByUser(this.userStorage?.id).subscribe({
        next: (res: HttpResponse<ICourse[]>) => {
          const courses = res.body;
          if (courses && courses?.length > 0) {
            courses?.forEach((course) => {
              if (course?.slug === this.courseSlug) {
                this.isRegistered = true;
              }
            });
          }
        },
      });
    }
  }
}
