import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {ITopic} from "../model/topic.model";
import {SERVER_API_KEY, SERVER_API_URL} from "../../app.constants";
import {SharedFunctions} from "../shared.functions";
import {AccountService} from "../../core/auth/account.service";
import {Authority} from "../constants/authority.constants";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
;

type EntityResponseType = HttpResponse<ITopic>;
type EntityArrayResponseType = HttpResponse<ITopic[]>;

@Injectable({providedIn: 'root'})
export class TopicService {
  public resourceUrl = SERVER_API_URL + 'api/admin/topics';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/topics';

  constructor(
    protected http: HttpClient,
    protected sharedFunctions: SharedFunctions,
    private accountService: AccountService
  ) {}

  create(topic: ITopic): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(topic);
    return this.http
      .post<ITopic>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(topic: ITopic): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(topic);
    return this.http
      .put<ITopic>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITopic>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getAccountTopic(
    moduleId: number,
    topicId: number,
    authority?: string
  ): Observable<EntityResponseType> {
    let url = '';
    if (
      authority === Authority.ADMIN ||
      this.accountService.isAdmin() ||
      authority === Authority.TEACHER
    ) {
      url = `${SERVER_API_URL}api/teacher/modules/${moduleId}/topics/${topicId}/topic`;
    } else if (authority === Authority.USER || !authority) {
      url = `${SERVER_API_URL}api/account/modules/${moduleId}/topics/${topicId}/topic`;
    }

    return this.http
      .get<ITopic>(url, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITopic[]>(this.resourceUrl, { params: options, observe: 'response' })
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
      .get<ITopic[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  saveTopicHtml(topicId: number, html: string): Observable<EntityResponseType> {
    const data = new FormData();
    data.append('html', html);
    return this.http
      .put<ITopic>(`${SERVER_API_URL}api/public/${SERVER_API_KEY}/topics/${topicId}/import`, data, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getTopicId(
    topicSlug: string,
    authority?: string
  ): Observable<HttpResponse<number>> {
    let url = '';
    if (authority === Authority.ADMIN || this.accountService.isAdmin()) {
      url = `${SERVER_API_URL}api/admin/topics/${topicSlug}/topic`;
    } else if (authority === Authority.TEACHER) {
      url = `${SERVER_API_URL}api/teacher/topics/${topicSlug}/topic`;
    } else if (authority === Authority.USER || !authority) {
      url = `${SERVER_API_URL}api/account/topics/${topicSlug}/topic`;
    }
    return this.http.get<number>(url, { observe: 'response' });
  }

  protected convertDateFromClient(topic: ITopic): ITopic {
    const copy: ITopic = Object.assign({}, topic, {
      createdDate:
        topic.createdDate && topic.createdDate.isValid()
          ? topic.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        topic.lastModifiedDate && topic.lastModifiedDate.isValid()
          ? topic.lastModifiedDate.toJSON()
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
      res.body.html = res.body.html.replace(
        /##BASEDIR##\//g,
        this.sharedFunctions.getImageDir()
      );
      res.body.imageUrl =
        this.sharedFunctions.getImageDir() + res.body.imageUrl;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((topic: ITopic) => {
        topic.createdDate = topic.createdDate
          ? moment(topic.createdDate)
          : undefined;
        topic.lastModifiedDate = topic.lastModifiedDate
          ? moment(topic.lastModifiedDate)
          : undefined;
        topic.imageUrl = this.sharedFunctions.getImageDir() + topic.imageUrl;
      });
    }
    return res;
  }
}
