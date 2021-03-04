import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUserSkill } from './user-skill.model';
import { SharedFunctions } from 'app/shared/shared.functions';
import { UsersUserService } from 'app/manager/user-team/user/users-user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'wok-user-skill-grid',
  templateUrl: './user-skill-grid.component.html',
  styleUrls: ['./user-skill-grid.component.scss']
})
export class UserSkillGridComponent implements OnInit {
  @Input() slug?: string;
  // userSkills?:IUserSkill[];
  displayedColumns = ['position', 'user', 'point', 'maxPoint'];
  dataSource = new MatTableDataSource<IUserSkill>();
  isLoadingResults = false;

  constructor(public sharedFunctions: SharedFunctions, private userService: UsersUserService) {
  }

  ngOnInit(): void {
    this.getRankUserSkills();
  }

  getRankUserSkills(): void {
    if (this.slug)
      this.userService.getRankUserSkills(this.slug).subscribe((res: HttpResponse<IUserSkill[]>) => {
        this.dataSource = new MatTableDataSource<IUserSkill>(res.body || []);
        // this.userSkills = res.body || [];
      });
  }

}
