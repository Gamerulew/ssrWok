import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {SERVER_API_URL} from "../../app.constants";
import {IRegistration} from "../model/registration.model";
import {AccountService} from "../../core/auth/account.service";
import {createRequestOption, SearchWithPagination} from "../util/request-util";



type EntityResponseType = HttpResponse<IRegistration>;
type EntityArrayResponseType = HttpResponse<IRegistration[]>;

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  public resourceUrl = SERVER_API_URL + 'api/admin/registrations';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/registrations';

  constructor(
    protected http: HttpClient,
    protected accountService: AccountService
  ) {}

  create(registration: IRegistration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(registration);
    return this.http
      .post<IRegistration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(registration: IRegistration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(registration);
    return this.http
      .put<IRegistration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRegistration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegistration[]>(this.resourceUrl, {
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
      .get<IRegistration[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getAllRegistrationsByCourse(
    id: number
  ): Observable<HttpResponse<IRegistration[]>> {
    let url = '';
    if (this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/courses/${id}/registrations/`;
    } else if (this.accountService.isUser()) {
      url = `${SERVER_API_URL}api/account/courses/${id}/registrations/`;
    }
    return this.http.get<IRegistration[]>(url, { observe: 'response' });
  }

  createPublicRegistration(
    codeCourse: string,
    userTeamId: number
  ): Observable<EntityResponseType> {
    const formData: any = new FormData();
    formData.append('codeCourse', codeCourse);
    formData.append('userTeamId', userTeamId);
    return this.http
      .post<IRegistration>(
        `${SERVER_API_URL}api/account/courses/registrations`,
        formData,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromClient(registration: IRegistration): IRegistration {
    const copy: IRegistration = Object.assign({}, registration, {
      createdDate:
        registration.createdDate && registration.createdDate.isValid()
          ? registration.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        registration.lastModifiedDate && registration.lastModifiedDate.isValid()
          ? registration.lastModifiedDate.toJSON()
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
      res.body.forEach((registration: IRegistration) => {
        registration.createdDate = registration.createdDate
          ? moment(registration.createdDate)
          : undefined;
        registration.lastModifiedDate = registration.lastModifiedDate
          ? moment(registration.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
