import {Component, OnInit} from '@angular/core';
import {ICourse} from "../../../shared/model/course.model";
import {IModuleTopic} from "../../../shared/model/module-topic.model";
import {ActivatedRoute} from "@angular/router";
import {SharedFunctions} from "../../../shared/shared.functions";
import {HttpResponse} from "@angular/common/http";
import {CourseService} from "../../../shared/services/course.service";
import {ModuleTopicService} from "../../../shared/services/module-topic.service";

@Component({
  selector: 'wok-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.scss'],
})
export class ContestDetailComponent implements OnInit {
  courseId?: number;
  courseSlug?: string;
  course!: ICourse;
  selectedTab = 0;
  selectedModule!: number;
  selectedExercise!: number;
  selectedTopicContent!: number;
  registerCourses?: ICourse[];
  topicByLevel: IModuleTopic[][] = [];

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private moduleTopicService: ModuleTopicService,
    public sharedFunctions: SharedFunctions
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.courseSlug = params.trainingSlug;
      this.getContest();
      // this.findAccountCourses();
    });
  }

  verifyRegister(): boolean {
    let exist = false;
    if (this.registerCourses && this.course) {
      this.registerCourses.forEach((course) => {
        if (course?.id === this.course?.id) {
          exist = true;
        }
      });
    }
    return exist;
  }

  getContest(): void {
    if (this.courseSlug) {
      this.courseService.getTrainingBySlug(this.courseSlug).subscribe({
        next: (res: HttpResponse<ICourse>) => {
          if (res.body) {
            this.course = res.body || {};
          }
        },
      });
    }
  }

  findAccountCourses(): void {
    this.courseService
      .findAccountCourses()
      .subscribe((res: HttpResponse<ICourse[]>) => {
        this.registerCourses = res.body || [];
      });
  }

  getModuleTopics(i: number, moduleId?: number): void {
    if (moduleId && !(this.course.modules && this.course.modules[i].topicsM)) {
      this.moduleTopicService
        .getAllModuleTopicByPublicModule(moduleId).subscribe(res => {
        const topics: IModuleTopic[][] = [];
        for (const tLKey in res.body) {
          if (res.body[tLKey]) {
            topics.push(res.body[tLKey]);
          }
        }
        this.selectedModule = moduleId;
        this.selectedTab = 1;
        if (this?.course && this.course.modules && this?.course?.modules[i]) {
          this.course.modules[i].topicsM = topics;
        }
      });
    }
    // .subscribe((res: HttpResponse<IModuleTopic[][]>) => {
    //   for (const tLKey in res.body) {
    //     if (res.body[tLKey]) {
    //       this.topicByLevel.push(res.body[tLKey]);
    //     }
    //   }
    //   this.selectedModule = moduleId;
    //   this.selectedTab = 1;
    // });
  }

  selectTopicContent(selectedTopic: number): void {
    this.selectedTopicContent = selectedTopic;
    this.selectedTab = 2;
  }

  selectExercise(exerciseId: number): void {
    this.selectedExercise = exerciseId;
    this.selectedTab = 3;
  }
}
