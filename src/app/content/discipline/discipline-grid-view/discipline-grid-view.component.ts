import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {IDisciplineBasic} from "../../../shared/model/basic-dto/discipline-basic.model";
import {SharedFunctions} from "../../../shared/shared.functions";
import {HttpResponse} from "@angular/common/http";
import {DisciplineService} from "../../../shared/services/discipline.service";


@Component({
  selector: 'wok-discipline-grid-view',
  templateUrl: './discipline-grid-view.component.html',
  styleUrls: ['./discipline-grid-view.component.scss']
})
export class DisciplineGridViewComponent implements OnInit, OnChanges {
  disciplines: IDisciplineBasic[] = [];

  constructor(private disciplineService: DisciplineService, public sharedFunctions: SharedFunctions) {}

  // eslint-disable-next-line
  ngOnChanges(changes: SimpleChanges): void {
    this.getDisciplinesList();
  }

  ngOnInit(): void {
    this.getDisciplinesList();
  }

  getDisciplinesList(): void {
    this.disciplineService.getDisciplinesList().subscribe((res: HttpResponse<IDisciplineBasic[]>) => {
      this.disciplines = res.body;
    });
  }
}
