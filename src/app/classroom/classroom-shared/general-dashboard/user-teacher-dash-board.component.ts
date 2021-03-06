import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {ICourse} from "../../../shared/model/course.model";
import {AccountService} from "../../../core/auth/account.service";
import {CourseService} from "../../../shared/services/course.service";
import {SharedFunctions} from "../../../shared/shared.functions";
import {CourseType} from "../../../shared/model/enumerations/course-type.model";
import {AddCourseDialogComponent} from "../../../wok/add-course-dialog/add-course-dialog.component";
import {AddPrivateCourseDialogComponent} from "../../../wok/add-private-course-dialog/add-private-course-dialog.component";

@Component({
  selector: 'wok-user-teacher-dash-board',
  templateUrl: './user-teacher-dash-board.component.html',
  styleUrls: ['./user-teacher-dash-board.component.scss'],
})
export class UserTeacherDashBoardComponent implements OnInit {
  account!: Account;
  courses?: ICourse[];
  trainings?: ICourse[];
  publicContests?: ICourse[];
  showTrainings?: boolean;
  teacherCourses?: ICourse[];
  teacherTrainings?: ICourse[];
  selected = new FormControl(0);
  allTeachingCourse = false;

  constructor(
    public accountService: AccountService,
    private courseService: CourseService,
    public sharedFunctions: SharedFunctions,
    public dialog: MatDialog,
    protected activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const showT = params.get('showTrainings');
      if (showT && showT === 'true') {
        this.showTrainings = true;
        this.selected.setValue(1);
      }
      this.getCourses();
      this.getTeacherCourses();
    });

    this.getTrainings();
  }

  getCourses(): void {
    this.courseService
      .findAccountCourses()
      .subscribe((res: HttpResponse<ICourse[]>) => {
        this.mapCourses(res.body || []);
      });
  }

  getTeacherCourses(getAll = false): void {
    if (this.sharedFunctions.isTeacher()) {
      this.courseService
        .getTeachingCourses(getAll)
        .subscribe((res: HttpResponse<ICourse[]>) => {
          this.mapTeacherCourses(res.body || []);
        });
    }
  }


  getTrainings(): void {
    this.courseService
      .getPublicContests()
      .subscribe((res: HttpResponse<ICourse[]>) => {
        this.publicContests = res.body || [];
      });
  }

  mapCourses(allCourses: ICourse[]): void {
    if (allCourses) {
      this.courses = allCourses.filter((item) => {
        return (
          item.courseType === CourseType.PRIVATE ||
          item.courseType === CourseType.TEST
        );
      });

      this.trainings = allCourses.filter((item) => {
        return item.courseType === CourseType.PUBLIC;
      });
    }
  }

  mapTeacherCourses(allCourses: ICourse[]): void {
    if (allCourses) {
      this.teacherCourses = allCourses.filter((item) => {
        return (
          item.courseType === CourseType.PRIVATE ||
          item.courseType === CourseType.TEST
        );
      });

      this.teacherTrainings = allCourses.filter((item) => {
        return item.courseType === CourseType.PUBLIC;
      });
    }
  }

  openAddCourseDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getCourses();
    });
  }

  openAddPrivateCourseDialog(): void {
    const dialogRef = this.dialog.open(AddPrivateCourseDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getCourses();
    });
  }
}
