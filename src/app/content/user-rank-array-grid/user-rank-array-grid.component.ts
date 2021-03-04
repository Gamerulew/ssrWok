import {Component, Input, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ICourse} from './course.model';
import {CourseService} from 'app/manager/wok/course/course.service';
import {ModuleTopicExerciseService} from 'app/manager/wok/module/module-topic/module-topic-exercise/module-topic-exercise.service';
import {IModuleTopicExercise} from './module-topic-exercise.model';
import {IModule} from "./module.model";

@Component({
  selector: 'wok-user-rank-array-grid',
  templateUrl: './user-rank-array-grid.component.html',
  styleUrls: ['./user-rank-array-grid.component.scss'],
})
export class UserRankArrayGridComponent implements OnInit {
  @Input() rankFor?: string;
  @Input() id?: number;
  @Input() courseSlug?: number;
  @Input() modules?: IModule[];
  array?: any[];
  expanded?: boolean;

  constructor(
    protected courseService: CourseService,
    protected moduleTopicExercise: ModuleTopicExerciseService
  ) {}

  ngOnInit(): void {
    if (this.rankFor === 'module' && !this.modules) {
      this.findCourse();
    } else if (this.modules) {
      this.array = this.modules || [];
    } else if (this.rankFor === 'exercise') {
      this.findModuleTopicExercises();
    }
  }

  findCourse(): void {
    if (this.id) {
      this.courseService
        .findCourse(this.id)
        .subscribe((res: HttpResponse<ICourse>) => {
          this.array = res.body?.modules || [];
        });
    }
  }

  findModuleTopicExercises(): void {
    if (this.id) {
      this.moduleTopicExercise
        .getModuleTopicExerciseByModuleId(this.id)
        .subscribe((res: HttpResponse<IModuleTopicExercise[]>) => {
          this.array = res.body!;
        });
    }
  }
}
