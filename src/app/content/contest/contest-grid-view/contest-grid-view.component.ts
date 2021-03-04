import {Component, OnInit} from '@angular/core';

import {HttpResponse} from '@angular/common/http';
import {ICourse} from "../../../shared/model/course.model";
import {CourseService} from "../../../shared/services/course.service";
import {SharedFunctions} from "../../../shared/shared.functions";
import {AccountService} from "../../../core/auth/account.service";

@Component({
  selector: 'wok-contest-grid-view',
  templateUrl: './contest-grid-view.component.html',
  styleUrls: ['./contest-grid-view.component.scss']
})
export class ContestGridViewComponent implements OnInit {
  contests!: ICourse[];

  constructor(private courseService: CourseService, public sharedFunctions: SharedFunctions, public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getContests();
  }

  getContests(): void {
    this.courseService.getPublicContests().subscribe((res: HttpResponse<ICourse[]>) => {
      this.contests = res.body || [];
    });
  }
}
