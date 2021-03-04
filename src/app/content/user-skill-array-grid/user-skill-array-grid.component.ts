import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import {ISkillBasic} from "../../shared/model/basic-dto/skill-basic.model";
import {SkillService} from "../../shared/services/skill.service";

@Component({
  selector: 'wok-user-skill-array-grid',
  templateUrl: './user-skill-array-grid.component.html',
  styleUrls: ['./user-skill-array-grid.component.scss']
})
export class UserSkillArrayGridComponent implements OnInit {
  skills?: ISkillBasic[];

  constructor(protected skillService: SkillService) {
  }

  ngOnInit(): void {
    this.getSkills()
  }

  getSkills(): void {
    this.skillService.getPublicSkills().subscribe((res: HttpResponse<ISkillBasic[]>) => {
      this.skills = res.body || [];
    });
  }
}
