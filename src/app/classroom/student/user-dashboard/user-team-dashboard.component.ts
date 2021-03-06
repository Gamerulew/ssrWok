import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// import { CourseType } from 'app/shared/model/enumerations/course-type.model';
// import * as moment from 'moment';
@Component({
  selector: 'wok-dashboard2',
  templateUrl: './user-team-dashboard.component.html',
  styleUrls: ['./user-team-dashboard.component.scss'],
})
export class UserTeamDashboardComponent implements OnInit {
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
