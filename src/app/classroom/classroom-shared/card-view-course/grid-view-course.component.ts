import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ICourse} from "../../../shared/model/course.model";
import {ICourseStatistic} from "../../../shared/model/course-static.model";
import {AccountService} from "../../../core/auth/account.service";
import {CourseService} from "../../../shared/services/course.service";
import {Authority} from "../../../shared/constants/authority.constants";


@Component({
  selector: 'wok-grid-view-course',
  templateUrl: './grid-view-course.component.html',
  styleUrls: ['./grid-view-course.component.scss'],
})
export class GridViewCourseComponent implements OnInit {
  @Input() course?: ICourse;
  courseStatistics?: ICourseStatistic;
  @Input() hasAdminAccess: boolean;
  routePrefix?: string;
  inativeDate?: boolean = undefined;

  constructor(public accountService: AccountService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    const currentDate = moment();
    if (this.course?.startDate && this.course?.endDate && !currentDate.isBetween(this.course?.startDate, this.course?.endDate)) {
      this.inativeDate = true;
    } else if (!this.course?.startDate || !this.course?.endDate) {
      this.inativeDate = undefined;
    } else if (currentDate.isBetween(this.course?.startDate, this.course?.endDate)) {
      this.inativeDate = false;
    }

    this.getCourseStatistics();
    this.routePrefix = this.hasAdminAccess ? '/teacher' : '/account';
  }

  getCourseStatistics(): void {
    if (this.course?.id) {
      this.courseService.getCourseStatic(this.course?.id, this.hasAdminAccess ? Authority.TEACHER : Authority.USER).subscribe(res => {
        this.courseStatistics = res.body || {};
      });
    }
  }
}
