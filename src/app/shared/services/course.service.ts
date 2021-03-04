import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {ICourse} from "../model/course.model";
import {ICourseStatistic} from "../model/course-static.model";
import {SERVER_API_URL} from "../../app.constants";
import {SharedFunctions} from "../shared.functions";
import {AccountService} from "../../core/auth/account.service";
import {Authority} from "../constants/authority.constants";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
import {IUserBasic} from "../model/basic-dto/user-basic.model";


type EntityResponseType = HttpResponse<ICourse>;
type EntityArrayResponseType = HttpResponse<ICourse[]>;
type EntityStatisticResponseType = HttpResponse<ICourseStatistic>;

@Injectable({providedIn: 'root'})
export class CourseService {
  public resourceUrl = SERVER_API_URL + 'api/admin/courses';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/courses';

  constructor(
    protected http: HttpClient,
    private sharedFunctions: SharedFunctions,
    private accountService: AccountService
  ) {
  }

  create(course: ICourse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(course);
    return this.http
      .post<ICourse>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(course: ICourse): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(course);
    return this.http
      .put<ICourse>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICourse>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getTrainingBySlug(slug: string): Observable<EntityResponseType> {
    return this.http
      .get<ICourse>(`${SERVER_API_URL}api/public/courses/${slug}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getCourseId(
    courseSlug: string,
    authority?: string
  ): Observable<HttpResponse<number>> {
    let url = '';
    if (authority === Authority.ADMIN || this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/admin/courses/${courseSlug}/course`;
    } else if (authority === Authority.TEACHER) {
      url = `${SERVER_API_URL}api/teacher/courses/${courseSlug}/course`;
    } else if (authority === Authority.USER || !authority) {
      url = `${SERVER_API_URL}api/account/courses/${courseSlug}/course`;
    }
    return this.http.get<number>(url, {observe: 'response'});
  }

  findAccountCourses(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICourse[]>(`${SERVER_API_URL}api/account/courses`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  findAccountTeachingCourses(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICourse[]>(`${SERVER_API_URL}api/account/teaching`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  findCoursesByUser(id: number | string): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICourse[]>(`${SERVER_API_URL}api/admin/users/${id}/courses`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  findCoursesByTeacher(
    id: number | string
  ): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICourse[]>(`${SERVER_API_URL}api/admin/users/${id}/teaching`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getPublicContests(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICourse[]>(`${SERVER_API_URL}api/public/courses/contests`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getTeachingCourses(getAll = false): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICourse[]>(`${SERVER_API_URL}api/teacher/courses`, {
        observe: 'response', params: {all: getAll ? 'true' : 'false'}
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getCourseStatic(courseId: number, authority?: string): Observable<EntityStatisticResponseType> {
    let url = '';
    if (authority === Authority.USER) {
      url = `${SERVER_API_URL}api/account/courses/${courseId}/statistics`;
    }
    if (authority === Authority.TEACHER || this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/teacher/courses/${courseId}/statistics`;
    }
    return this.http
      .get<ICourseStatistic>(url, {
        observe: 'response'
      });
  }

  findPublicContest(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICourse>(`${SERVER_API_URL}api/public/courses/${id}`, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findCourse(
    id: number | string,
    authority?: string
  ): Observable<EntityResponseType> {
    let url = '';
    if ((authority === Authority.TEACHER && this.accountService.isTeacher()) || this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/teacher/courses/${id}`;
    } else if ((authority === Authority.USER && this.accountService.isUser()) || !authority) {
      url = `${SERVER_API_URL}api/account/courses/${id}`;
    }
    return this.http
      .get<ICourse>(url, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICourse[]>(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getCoursesByAffiliation(
    affiliationId: number
  ): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICourse[]>(
        `${SERVER_API_URL}api/admin/affiliation/${affiliationId}/courses`,
        {observe: 'response'}
      )
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
      .get<ICourse[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getAllUsersByCourse(id: number): Observable<HttpResponse<IUserBasic[]>> {
    return this.http.get<IUserBasic[]>(
      SERVER_API_URL + `api/admin/courses/${id}/users`,
      {observe: 'response'}
    );
  }

  protected convertDateFromClient(course: ICourse): ICourse {
    const copy: ICourse = Object.assign({}, course, {
      createdDate:
        course.createdDate && course.createdDate.isValid()
          ? course.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        course.lastModifiedDate && course.lastModifiedDate.isValid()
          ? course.lastModifiedDate.toJSON()
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
      res.body.forEach((course: ICourse) => {
        course.createdDate = course.createdDate
          ? moment(course.createdDate)
          : undefined;
        course.lastModifiedDate = course.lastModifiedDate
          ? moment(course.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
