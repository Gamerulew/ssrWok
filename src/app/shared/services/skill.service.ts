import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

import {ISkill} from "../model/skill.model";
import {SERVER_API_URL} from "../../app.constants";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
import {
  ChartBarSkill,
  IChartBarSkill,
  ISeriesDifficultyLevel,
  SeriesDifficultyLevel
} from "../model/chart-bar-skills.model";

type EntityResponseType = HttpResponse<ISkill>;
type EntityArrayResponseType = HttpResponse<ISkill[]>;

@Injectable({providedIn: 'root'})
export class SkillService {
  public resourceUrl = SERVER_API_URL + 'api/admin/skills';
  public resourceUrlSA = SERVER_API_URL + 'api/skills';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/skills';

  constructor(protected http: HttpClient) {
  }

  create(skill: ISkill): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(skill);
    return this.http
      .post<ISkill>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(skill: ISkill): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(skill);
    return this.http
      .put<ISkill>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISkill>(`${this.resourceUrlSA}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getChartBarSkills(id: number): Observable<IChartBarSkill> {
    return this.http
      .get<{}>(`${SERVER_API_URL}api/admin/skills/exercises/disciplines/${id}/graph`, {observe: 'response'})
      .pipe(map((res: HttpResponse<{}>) => this.convertDataChartBar(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISkill[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getPublicSkills(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ISkill[]>(`${SERVER_API_URL}api/public/skills`, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISkill[]>(this.resourceSearchUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(skill: ISkill): ISkill {
    const copy: ISkill = Object.assign({}, skill, {
      createdDate: skill.createdDate && skill.createdDate.isValid() ? skill.createdDate.toJSON() : undefined,
      lastModifiedDate: skill.lastModifiedDate && skill.lastModifiedDate.isValid() ? skill.lastModifiedDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((skill: ISkill) => {
        skill.createdDate = skill.createdDate ? moment(skill.createdDate) : undefined;
        skill.lastModifiedDate = skill.lastModifiedDate ? moment(skill.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

  protected convertDataChartBar(res: HttpResponse<any>): IChartBarSkill {
    const data: ISeriesDifficultyLevel[] = [];
    let chartData: IChartBarSkill = {};
    if (res.body) {
      for (const chartBar in res.body.data) {
        if (chartBar) {
          data.push({
            ...new SeriesDifficultyLevel(),
            name: chartBar,
            data: res.body.data[chartBar].data
          });
        }
      }
      chartData = {
        ...new ChartBarSkill(),
        skills: res.body.skills,
        seriesDifficultyLevel: data
      };
    }
    return chartData;
  }
}
