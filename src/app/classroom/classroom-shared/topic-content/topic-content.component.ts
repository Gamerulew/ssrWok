import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {IUserResult} from "../../../shared/model/user-results.model";
import {ITopic} from "../../../shared/model/topic.model";
import {IExerciseBasic} from "../../../shared/model/basic-dto/exercise-basic.model";
import {ExerciseService} from "../../../shared/services/exercise.service";
import {TopicService} from "../../../shared/services/topic.service";
import {UsersUserService} from "../../../shared/services/users-user.service";
import {DifficultyLevelService} from "../../../shared/services/difficulty-level.service";
import {Authority} from "../../../shared/constants/authority.constants";

@Component({
  selector: 'wok-topic-content',
  templateUrl: './topic-content.component.html',
  styleUrls: ['./topic-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicContentComponent implements OnInit {
  @Input() topicId?: number;
  @Input() routePrefix?: string;
  @Input() hasHighAccess = false;
  @Input() moduleId?: number;
  @Input() courseId?: number;

  @Output()
  selectedExerciseId: EventEmitter<number> = new EventEmitter<number>();
  userResults?: IUserResult[];
  selectedTopicContent?: ITopic;
  exercises?: IExerciseBasic[];
  courseSlug?: string;
  disciplineSlug?: string;
  topicSlug?: string;
  constructor(
    private exerciseService: ExerciseService,
    private topicService: TopicService,
    public difficultyLevelService: DifficultyLevelService,
    private userService: UsersUserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params) {
        this.courseSlug = params.courseSlug;
        this.disciplineSlug = params.disciplineSlug;
        this.topicSlug = params.topicSlug;
      }
      if (!this.routePrefix) {
        this.activatedRoute.data.subscribe((data) => {
          this.routePrefix = `/${data.accessType}`;
        });
      }
    });
    this.getTopicContent();
  }

  getDifficultyColor(difficultyId: string): string {
    return this.difficultyLevelService.getDifficultyColor(difficultyId);
  }

  getTopicContent(): void {
    if (this.moduleId && this.topicId) {
      this.topicService
        .getAccountTopic(
          this.moduleId,
          this.topicId,
          this.hasHighAccess ? Authority.TEACHER : Authority.USER
        )
        .subscribe((res: HttpResponse<ITopic>) => {
          this.selectedTopicContent = res.body || {};
          if (this.hasHighAccess && this.moduleId && this.topicId) {
            this.exerciseService
              .getExerciseByTopicByModule(this.moduleId, this.topicId, this.hasHighAccess ? Authority.TEACHER : Authority.USER)
              .subscribe({
                next: (res1: HttpResponse<IExerciseBasic[]>) =>
                  (this.exercises = res1.body || []),
              });
          } else {
            this.getUserResults();
          }

          // /api/teacher/modules/{idModule}/topics/{idTopic}/exercises
        });
    }
    // if(this.MathJaxscripts.loaded){
    //   console.warn('script Executado topisssc');
    //   loadMathJax();
    // }
  }

  getUserResults(): void {
    if (this.moduleId && this.topicId) {
      this.userService
        .getUserResultsByModuleAndTopic(this.moduleId, this.topicId)
        .subscribe((res: HttpResponse<IUserResult[]>) => {
          this.userResults = res.body || [];
        });
    }
  }

  selectExercise(exerciseId: number): void {
    this.selectedExerciseId.emit(exerciseId);
  }
}
