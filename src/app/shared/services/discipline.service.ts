import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IDiscipline} from "../model/discipline.model";
import {IDisciplineStatistics} from "../model/projections/discipline-statistics.model";
import {IScenarioSkill} from "../model/scenario-skill.model";
import {IDisciplineBasic} from "../model/basic-dto/discipline-basic.model";
import {SERVER_API_URL} from "../../app.constants";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
import {ITopicExercise} from "../model/topic-exercise.model";


type EntityResponseType = HttpResponse<IDiscipline>;
type EntityArrayResponseType = HttpResponse<IDiscipline[]>;
type EntityArrayStatisticResponseType = HttpResponse<IDisciplineStatistics[]>;
type EntityArrayDisciplineSkillType = HttpResponse<IScenarioSkill[]>;
type EntityBasicResponseType = HttpResponse<IDisciplineBasic>;
type EntityArrayBasicResponseType = HttpResponse<IDisciplineBasic[]>;

@Injectable({ providedIn: 'root' })
export class DisciplineService {
  public resourceUrl = SERVER_API_URL + 'api/admin/disciplines';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/disciplines';
  public publicResourceUrl = SERVER_API_URL + 'api/public/disciplines';

  constructor(protected http: HttpClient) {}

  create(discipline: IDiscipline): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(discipline);
    return this.http
      .post<IDiscipline>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(discipline: IDiscipline): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(discipline);
    return this.http
      .put<IDiscipline>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDiscipline>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findPublic(slug: string): Observable<EntityResponseType> {
    return this.http
      .get<IDiscipline>(`${this.publicResourceUrl}/${slug}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiscipline[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  getExercisesByTopic(disciplineId?: number, topicId?: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<ITopicExercise[]>(`${this.resourceUrl}/${disciplineId}/topics/${topicId}/exercises`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}/`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiscipline[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getDisciplinesList(): Observable<EntityArrayBasicResponseType> {
    return this.http.get<IDisciplineBasic[]>(this.publicResourceUrl, { observe: 'response' });
  }

  protected convertDateFromClient(discipline: IDiscipline): IDiscipline {
    const copy: IDiscipline = Object.assign({}, discipline, {
      createdDate: discipline.createdDate && discipline.createdDate.isValid() ? discipline.createdDate.toJSON() : undefined,
      lastModifiedDate:
        discipline.lastModifiedDate && discipline.lastModifiedDate.isValid() ? discipline.lastModifiedDate.toJSON() : undefined
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
      res.body.forEach((discipline: IDiscipline) => {
        discipline.createdDate = discipline.createdDate ? moment(discipline.createdDate) : undefined;
        discipline.lastModifiedDate = discipline.lastModifiedDate ? moment(discipline.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

  listDisciplineStatistics(): Observable<EntityArrayStatisticResponseType> {
    return this.http.get<IDisciplineStatistics[]>(`${this.resourceUrl}/statistics`, { observe: 'response' });
  }

  getScenarioSkillByDiscipline(id: number): Observable<EntityArrayDisciplineSkillType> {
    return this.http.get<IScenarioSkill[]>(`${this.resourceUrl}/${id}/skills`, { observe: 'response' });
  }
}
