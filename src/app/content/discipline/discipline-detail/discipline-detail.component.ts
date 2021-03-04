import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IDiscipline} from "../../../shared/model/discipline.model";
import {IDisciplineTopic} from "../../../shared/model/discipline-topic.model";
import {SharedFunctions} from "../../../shared/shared.functions";
import {HttpResponse} from "@angular/common/http";
import {DisciplineTopicService} from "../../../shared/services/discipline-topic.service";
import {DisciplineService} from "../../../shared/services/discipline.service";


@Component({
  selector: 'wok-discipline-detail',
  templateUrl: './discipline-detail.component.html',
  styleUrls: ['./discipline-detail.component.scss']
})
export class DisciplineDetailComponent implements OnChanges {
  disciplineSlug!: string;
  discipline!: IDiscipline;
  public topicByLevel: IDisciplineTopic[][] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private disciplineTopicService: DisciplineTopicService,
    private disciplineService: DisciplineService,
    public sharedFunctions: SharedFunctions
  ) {
    this.getRouteParams();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(changes);
    this.getRouteParams();
  }

  private getRouteParams(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.disciplineSlug = params.slug;
      this.getDiscipline();
    });
  }

  private getDiscipline(): void {
    this.disciplineService.findPublic(this.disciplineSlug).subscribe((res: HttpResponse<IDiscipline>) => {
      this.discipline = res.body;
      this.getTopicByLevel();
    });
  }

  private getTopicByLevel(): void {
    this.topicByLevel = [];
    this.disciplineTopicService.getAllTopicByPublicDiscipline(this.discipline.id).subscribe((res: HttpResponse<IDisciplineTopic[][]>) => {
      for (const tLKey in res.body) {
        if (res.body[tLKey]) {
          this.topicByLevel.push(res.body[tLKey]);
        }
      }
    });
  }
}
