import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {SERVER_API_URL} from "../../app.constants";
import {IExercise} from "../model/exercise.model";
import {SharedFunctions} from "../shared.functions";
import {AccountService} from "../../core/auth/account.service";
import {IScenario} from "../model/scenario.model";
import {ISubmission} from "../model/submission.model";
import {IExerciseBasic} from "../model/basic-dto/exercise-basic.model";
import {Authority} from "../constants/authority.constants";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
import {IExerciseStatistics} from "../model/projections/exercise-statistics.model";

type EntityResponseType = HttpResponse<IExercise>;
type EntityArrayResponseType = HttpResponse<IExercise[]>;

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  public resourceUrl = SERVER_API_URL + 'api/admin/exercises';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/exercises';

  constructor(
    protected http: HttpClient,
    protected sharedFunctions: SharedFunctions,
    protected accountService: AccountService
  ) {}

  create(exercise: IExercise): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(exercise);
    return this.http
      .post<IExercise>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findScenarioByExercise(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IScenario[]>(`${this.resourceUrl}/${id}/scenarios`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  update(exercise: IExercise): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(exercise);
    return this.http
      .put<IExercise>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getSubmissionsByExercise(id?: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<ISubmission[]>(
        `${SERVER_API_URL}api/admin/exercises/${id}/submissions`,
        { observe: 'response' }
      )
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getExerciseByTopicByModule(
    moduleId: number,
    topicId: number,
    authority?: string
  ): Observable<HttpResponse<IExerciseBasic[]>> {
    let url = '';
    if (
      authority === Authority.ADMIN ||
      this.accountService.isAdmin() ||
      authority === Authority.TEACHER
    ) {
      url = `${SERVER_API_URL}api/teacher/modules/${moduleId}/topics/${topicId}/exercises`;
    } else if (authority === Authority.USER || !authority) {
      url = `${SERVER_API_URL}api/account/modules/${moduleId}/topics/${topicId}/exercises`;
    }
    return this.http.get<IExerciseBasic[]>(url, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExercise>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExercise[]>(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExercise[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getAllExercisesStatisct(): Observable<HttpResponse<IExerciseStatistics[]>> {
    return this.http.get<IExerciseStatistics[]>(
      `${this.resourceUrl}/statistics`,
      { observe: 'response' }
    );
  }

  count(req?: any): Observable<HttpResponse<number>> {
    const options = createRequestOption(req);
    return this.http.get<number>(`${this.resourceUrl}/count`, {
      params: options,
      observe: 'response',
    });
  }

  getExerciseId(exerciseSlug: string): Observable<HttpResponse<number>> {
    let url = '';
    if (this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/admin/exercises/${exerciseSlug}/exercise`;
    } else if (this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/exercises/${exerciseSlug}/exercise`;
    } else if (this.accountService.isUser()) {
      url = `${SERVER_API_URL}api/account/exercises/${exerciseSlug}/exercise`;
    }
    return this.http.get<number>(url, { observe: 'response' });
  }

  protected convertDateFromClient(exercise: IExercise): IExercise {
    const copy: IExercise = Object.assign({}, exercise, {
      createdDate:
        exercise.createdDate && exercise.createdDate.isValid()
          ? exercise.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        exercise.lastModifiedDate && exercise.lastModifiedDate.isValid()
          ? exercise.lastModifiedDate.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate
        ? moment(res.body.createdDate)
        : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate
        ? moment(res.body.lastModifiedDate)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((exercise: IExercise) => {
        exercise.createdDate = exercise.createdDate
          ? moment(exercise.createdDate)
          : undefined;
        exercise.lastModifiedDate = exercise.lastModifiedDate
          ? moment(exercise.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
