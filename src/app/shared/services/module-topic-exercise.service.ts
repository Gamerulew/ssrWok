import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IModuleTopicExercise} from "../model/module-topic-exercise.model";
import {SERVER_API_URL} from "../../app.constants";
import {SharedFunctions} from "../shared.functions";
import {AccountService} from "../../core/auth/account.service";
import {createRequestOption, SearchWithPagination} from "../util/request-util";



type EntityResponseType = HttpResponse<IModuleTopicExercise>;
type EntityArrayResponseType = HttpResponse<IModuleTopicExercise[]>;

@Injectable({ providedIn: 'root' })
export class ModuleTopicExerciseService {
  public resourceUrl = SERVER_API_URL + 'api/admin/modules/topics/exercises';
  public resourceSearchUrl =
    SERVER_API_URL + 'api/admin/_search/modules/topics/exercises';

  constructor(
    protected http: HttpClient,
    protected sharedFunctions: SharedFunctions,
    public accountService: AccountService
  ) {}

  create(
    moduleTopicExercise: IModuleTopicExercise
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(moduleTopicExercise);
    return this.http
      .post<IModuleTopicExercise>(this.resourceUrl, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(
    moduleTopicExercise: IModuleTopicExercise
  ): Observable<EntityResponseType> {
    let url = this.resourceUrl;
    if (this.accountService.isTeacher() && !this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/teacher/modules/topics/exercises`;
    }
    const copy = this.convertDateFromClient(moduleTopicExercise);
    return this.http
      .put<IModuleTopicExercise>(url, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IModuleTopicExercise>(`${this.resourceUrl}/${id}`, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getModuleTopic(
    moduleId: number,
    topicId: number,
    exerciseId: number
  ): Observable<EntityResponseType> {
    let url = '';
    if (this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/modules/${moduleId}/topics/${topicId}/exercises/${exerciseId}`;
    }else if (this.accountService.isUser()) {
      url = `${SERVER_API_URL}api/account/modules/${moduleId}/topics/${topicId}/exercises/${exerciseId}`;
    }
    return this.http
      .get<IModuleTopicExercise>(url, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getModuleTopicExerciseByModuleTopicId(
    moduleTopicId: number
  ): Observable<EntityArrayResponseType> {
    let url = `${SERVER_API_URL}api/admin/modules/${moduleTopicId}/topics/exercises`;
    if (this.accountService.isTeacher() && !this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/teacher/modules/topics/${moduleTopicId}/exercises`;
    }
    return this.http
      .get<IModuleTopicExercise[]>(url, { observe: 'response' })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getModuleTopicExerciseByModuleId(
    id: number
  ): Observable<EntityArrayResponseType> {
    return this.http
      .get<IModuleTopicExercise[]>(
        `${SERVER_API_URL}api/teacher/modules/${id}/topics/exercises`,
        { observe: 'response' }
      )
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IModuleTopicExercise[]>(this.resourceUrl, {
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
      .get<IModuleTopicExercise[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  protected convertDateFromClient(
    moduleTopicExercise: IModuleTopicExercise
  ): IModuleTopicExercise {
    const copy: IModuleTopicExercise = Object.assign({}, moduleTopicExercise, {
      createdDate:
        moduleTopicExercise.createdDate &&
        moduleTopicExercise.createdDate.isValid()
          ? moduleTopicExercise.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        moduleTopicExercise.lastModifiedDate &&
        moduleTopicExercise.lastModifiedDate.isValid()
          ? moduleTopicExercise.lastModifiedDate.toJSON()
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
      res.body.forEach((moduleTopicExercise: IModuleTopicExercise) => {
        moduleTopicExercise.createdDate = moduleTopicExercise.createdDate
          ? moment(moduleTopicExercise.createdDate)
          : undefined;
        moduleTopicExercise.lastModifiedDate = moduleTopicExercise.lastModifiedDate
          ? moment(moduleTopicExercise.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
