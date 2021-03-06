import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import {IParamsSubmissionSearch} from "../../../shared/model/params-submission-search.model";
import {IModuleTopicExercise} from "../../../shared/model/module-topic-exercise.model";
import {ModuleTopicExerciseService} from "../../../shared/services/module-topic-exercise.service";

@Component({
  selector: 'wok-exercise-content',
  templateUrl: './exercise-content.component.html',
  styleUrls: ['./exercise-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseContentComponent implements OnInit {
  @Input() exerciseId!: number;
  @Input() hasHighAccess = false;
  @Input() moduleId!: number;
  @Input() topicId!: number;
  params?: IParamsSubmissionSearch;
  selectedModuleTopicExercise!: IModuleTopicExercise;
  exerciseFile: File | null = null;

  uploadExerciseForm = this.fb.group({
    uploadExercise: [null, [Validators.required]],
  });

  constructor(
    protected moduleTopicExerciseService: ModuleTopicExerciseService,
    private fb: FormBuilder,
    protected toastService: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getExercises();
    this.params = {
      topicId: this.topicId,
      moduleId: this.moduleId,
      exerciseId: this.exerciseId,
    };
    console.warn(this.params);
  }

  getExercises(): void {
    this.moduleTopicExerciseService
      .getModuleTopic(this.moduleId, this.topicId, this.exerciseId)
      .subscribe((res: HttpResponse<IModuleTopicExercise>) => {
        this.selectedModuleTopicExercise = res.body || {};
      });
  }

  uploadExercise(): void {
    this.toastService.success('exercise uploaded!');
  }

  handleFileInput(target: any): void {
    this.exerciseFile = target.files.item(0);
  }
  openUploadSubmissionDialog(): void {
    // this.dialog.open(UploadSubmissionGridComponent, {
    //   data: this.params,
    // });
  }
}
