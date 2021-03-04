import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {IModuleTopic} from "../model/module-topic.model";
import {SERVER_API_URL} from "../../app.constants";
import {AccountService} from "../../core/auth/account.service";
import {Authority} from "../constants/authority.constants";
import {createRequestOption, SearchWithPagination} from "../util/request-util";



type EntityResponseType = HttpResponse<IModuleTopic>;
type EntityArrayResponseType = HttpResponse<IModuleTopic[]>;
type EntityMapResponseType = HttpResponse<IModuleTopic[][]>;

@Injectable({providedIn: 'root'})
export class ModuleTopicService {
  public resourceUrl = SERVER_API_URL + 'api/admin/modules/topics';
  public resourceSearchUrl =
    SERVER_API_URL + 'api/admin/_search/modules/topics';

  constructor(
    protected http: HttpClient,
    public accountService: AccountService
  ) {
  }

  setDates(
    moduleTopicDates: any,
    authority: string
  ): Observable<EntityResponseType> {
    // const data = new FormData();
    // console.warn(moduleTopicDates?.activeTime);
    // data.append("activeTime", moduleTopicDates?.activeTime);
    // data.append("deactiveTime", moduleTopicDates?.deactiveTime);
    // data.append("startTime", moduleTopicDates?.startTime);
    // data.append("endTime", moduleTopicDates?.endTime);
    // data.append("freezeTime", moduleTopicDates?.freezeTime);
    // data.append("unfreezeTime", moduleTopicDates?.unfreezeTime);
    let url = '';
    if (authority === Authority.ADMIN || this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/admin/modules/topics/${moduleTopicDates?.moduleTopicId}/updateTimesModuleTopic`;
    } else if (authority === Authority.TEACHER) {
      url = `${SERVER_API_URL}api/teacher/modules/topics/${moduleTopicDates?.moduleTopicId}/updateTimesModuleTopic`;
    }
    moduleTopicDates.moduleTopicId = undefined;
    return this.http
      .put<IModuleTopic>(url, moduleTopicDates, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  create(moduleTopic: IModuleTopic): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(moduleTopic);
    return this.http
      .post<IModuleTopic>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(moduleTopic: IModuleTopic): Observable<EntityResponseType> {
    let url = this.resourceUrl;
    if (this.accountService.isTeacher() && !this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/teacher/modules/topics`;
    }
    const copy = this.convertDateFromClient(moduleTopic);
    return this.http
      .put<IModuleTopic>(url, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    let url = '';
    if (this.accountService.isAdmin()) {
      url = `${this.resourceUrl}/${id}`;
    } else if (this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/modules/topics/${id}`;
    }
    return this.http
      .get<IModuleTopic>(url, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getModuleTopicId(courseSlug: string, disciplineSlug: string, topicSlug: string, authority?: string): Observable<number> {
    let url = '';
    if (this.accountService.hasAnyAuthority(authority ? authority : '')) {
      if (this.accountService.isTeacher()) {
        url = `${SERVER_API_URL}api/teacher/courses/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}/module/topic`;
      }
    }
    return this.http
      .get<number>(url);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IModuleTopic[]>(this.resourceUrl, {
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

  getAllModuleTopicByModule(
    moduleId: number,
    authority?: string
  ): Observable<EntityMapResponseType> {
    let url = '';
    if (
      authority === Authority.ADMIN ||
      this.accountService.isAdmin() ||
      authority === Authority.TEACHER
    ) {
      url = `${SERVER_API_URL}api/teacher/modules/${moduleId}/topics`;
    } else if (authority === Authority.USER || !authority) {
      url = `${SERVER_API_URL}api/account/modules/${moduleId}/topics`;
    }
    return this.http
      .get<IModuleTopic[][]>(url, {observe: 'response'})
      .pipe(
        map((res: EntityMapResponseType) =>
          this.convertDateArrayArrayFromServer(res)
        )
      );
  }

  getAllModuleTopicByModuleAdmin(
    moduleId: number
  ): Observable<EntityArrayResponseType> {
    return this.http
      .get<IModuleTopic[]>(
        `${SERVER_API_URL}api/admin/modules/${moduleId}/topics`,
        {observe: 'response'}
      )
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getAllModuleTopicByPublicModule(
    moduleId: number
  ): Observable<EntityMapResponseType> {
    return this.http
      .get<IModuleTopic[][]>(
        `${SERVER_API_URL}api/public/modules/${moduleId}/topics`,
        {observe: 'response'}
      )
      .pipe(
        map((res: EntityMapResponseType) =>
          this.convertDateArrayArrayFromServer(res)
        )
      );
  }

  getModuleId(
    courseSlug: string,
    disciplineSlug?: string,
    authority?: string
  ): Observable<HttpResponse<number>> {
    let url = '';
    if (authority === Authority.ADMIN || this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/admin/courses/${courseSlug}/disciplines/${disciplineSlug}/module`;
    } else if (authority === Authority.TEACHER && this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/courses/${courseSlug}/disciplines/${disciplineSlug}/module`;
    } else if (authority === Authority.USER || !authority) {
      url = `${SERVER_API_URL}api/account/courses/${courseSlug}/disciplines/${disciplineSlug}/module`;
    }
    return this.http.get<number>(url, {observe: 'response'});
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IModuleTopic[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  protected convertDateFromClient(moduleTopic: IModuleTopic): IModuleTopic {
    const copy: IModuleTopic = Object.assign({}, moduleTopic, {
      createdDate:
        moduleTopic.createdDate && moduleTopic.createdDate.isValid()
          ? moduleTopic.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        moduleTopic.lastModifiedDate && moduleTopic.lastModifiedDate.isValid()
          ? moduleTopic.lastModifiedDate.toJSON()
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
      res.body.activeTime = res.body.activeTime
        ? moment(res.body.activeTime)
        : undefined;
      res.body.deactiveTime = res.body.deactiveTime
        ? moment(res.body.deactiveTime)
        : undefined;
      res.body.startTime = res.body.startTime
        ? moment(res.body.startTime)
        : undefined;
      res.body.endTime = res.body.endTime
        ? moment(res.body.endTime)
        : undefined;
      res.body.freezeTime = res.body.freezeTime
        ? moment(res.body.freezeTime)
        : undefined;
      res.body.unfreezeTime = res.body.unfreezeTime
        ? moment(res.body.unfreezeTime)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((moduleTopic: IModuleTopic) => {
        moduleTopic.createdDate = moduleTopic.createdDate
          ? moment(moduleTopic.createdDate)
          : undefined;
        moduleTopic.lastModifiedDate = moduleTopic.lastModifiedDate
          ? moment(moduleTopic.lastModifiedDate)
          : undefined;
        moduleTopic.activeTime = moduleTopic.activeTime
          ? moment(moduleTopic.activeTime)
          : undefined;
        moduleTopic.deactiveTime = moduleTopic.deactiveTime
          ? moment(moduleTopic.deactiveTime)
          : undefined;
        moduleTopic.startTime = moduleTopic.startTime
          ? moment(moduleTopic.startTime)
          : undefined;
        moduleTopic.deactiveTime = moduleTopic.deactiveTime
          ? moment(moduleTopic.deactiveTime)
          : undefined;
        moduleTopic.endTime = moduleTopic.endTime
          ? moment(moduleTopic.endTime)
          : undefined;
      });
    }
    return res;
  }

  protected convertDateArrayArrayFromServer(
    res: EntityMapResponseType
  ): EntityMapResponseType {
    // let moduleTopics:EntityMapResponseType = res;
    if (res.body) {
      // console.warn(Object.keys(res.body).map(key => (res.body ? res.body[key] : [])));
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      res.body = Object.keys(res.body).map((key) =>
        res.body ? res.body[key] : []
      );
      // const topiCTest: IModuleTopic[][] = [];
      // for (const tLKey in res.body) {
      //   if (res.body[tLKey]) {
      //     topiCTest.push(res.body[tLKey]);
      //   }
      // }
      res.body.forEach((moduleTopicArray) => {
        moduleTopicArray.forEach((moduleTopic: IModuleTopic) => {
          moduleTopic.createdDate = moduleTopic.createdDate
            ? moment(moduleTopic.createdDate)
            : undefined;
          moduleTopic.lastModifiedDate = moduleTopic.lastModifiedDate
            ? moment(moduleTopic.lastModifiedDate)
            : undefined;
          moduleTopic.activeTime = moduleTopic.activeTime
            ? moment(moduleTopic.activeTime)
            : undefined;
          moduleTopic.deactiveTime = moduleTopic.deactiveTime
            ? moment(moduleTopic.deactiveTime)
            : undefined;
          moduleTopic.startTime = moduleTopic.startTime
            ? moment(moduleTopic.startTime)
            : undefined;
          moduleTopic.endTime = moduleTopic.endTime
            ? moment(moduleTopic.endTime)
            : undefined;
          moduleTopic.deactiveTime = moduleTopic.deactiveTime
            ? moment(moduleTopic.deactiveTime)
            : undefined;
          moduleTopic.freezeTime = moduleTopic.freezeTime
            ? moment(moduleTopic.freezeTime)
            : undefined;
          moduleTopic.unfreezeTime = moduleTopic.unfreezeTime
            ? moment(moduleTopic.unfreezeTime)
            : undefined;
        });
      });
    }
    return res;
  }
}
