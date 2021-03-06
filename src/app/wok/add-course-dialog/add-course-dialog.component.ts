
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormControl} from '@angular/forms';
import {Router} from "@angular/router";
import {CourseService} from "../../shared/services/course.service";
import {RegistrationService} from "../../shared/services/registration.service";
import {UserTeamService} from "../../shared/services/user-team.service";
import {ICourse} from "../../shared/model/course.model";
import {IUserTeam} from "../../shared/model/user-team.model";

interface DialogData {
  moduleId: number;
  routePrefix?: string;
}

@Component({
  selector: 'wok-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss'],
})
export class AddCourseDialogComponent implements OnInit {
  publicContests?: ICourse[];
  selectedCourse?: ICourse;
  userTeams?: IUserTeam[];
  keyword = 'name';
  myCourseControl = new FormControl();
  filteredCourses?: ICourse[];

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    protected courseService: CourseService,
    protected toastService: ToastrService,
    private router: Router,
    protected registrationService: RegistrationService,
    protected userTeamService: UserTeamService,
    @Inject(MAT_DIALOG_DATA) public data?: DialogData
  ) {
  }

  ngOnInit(): void {
    this.getTrainings();
    this.getUserTeams();
    this.myCourseControl.valueChanges.subscribe((value) => {
      this.filteredCourses = this._filterCourses(value);
      this.selectCourse();
    });
    //   .pipe(
    //   map((value) => this._filterCourses(value)),
    //   tap((value) => this.selectCourse(value))
    // );
  }

  private _filterCourses(value: string): ICourse[] | undefined {
    const filterValue = value?.toLowerCase();
    return this.publicContests?.filter(
      (option) => option?.name?.toLowerCase()?.indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTrainings(): void {
    this.courseService
      .getPublicContests()
      .subscribe((res: HttpResponse<ICourse[]>) => {
        this.publicContests = res.body || [];
        if (this.data?.moduleId) {
          this.getCourseById();
        } else {
          this.filteredCourses = res.body || [];
        }
        this.selectCourse();
      });
  }

  getUserTeams(): void {
    this.userTeamService
      .findUserTeamsByAccount()
      .subscribe((res: HttpResponse<IUserTeam[]>) => {
        this.userTeams = res.body || [];
      });
  }

  joinCourse(courseId: number, code: string, userTeamId: string): void {
    this.subscribeToSaveResponse(
      this.registrationService.createPublicRegistration(
        code,
        Number(userTeamId)
      )
    );
  }

  selectCourse(): void {
    if (this.filteredCourses && this.filteredCourses?.length === 1) {
      this.selectedCourse = this.filteredCourses[0];
    } else {
      this.selectedCourse = undefined;
    }
  }

  onChangeSearch(val: string): void {
    console.warn(val);
  }

  onFocused(e: any): void {
    console.warn(e);
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IUserTeam>>
  ): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.toastService.success('Registered successfully');
    this.router.navigate([this.data?.routePrefix]);
    this.onNoClick();
  }

  protected onSaveError(): void {
  }

  getCourseById(): void {
    let baseCourse: ICourse = {};
    if (this.publicContests && this.publicContests?.length > 0) {
      this.publicContests?.forEach(course => {
        if (course?.id === this.data?.moduleId) {
          baseCourse = course;
        }
      });
      this.myCourseControl.setValue(baseCourse?.name);
      this.selectedCourse = baseCourse;
      this.filteredCourses = [baseCourse];
    }
  }
}
