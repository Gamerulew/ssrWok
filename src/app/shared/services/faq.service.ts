import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SERVER_API_URL} from "../../app.constants";
import {IFaq} from "../model/faq.model";
import {createRequestOption} from "../util/request-util";



type EntityResponseType = HttpResponse<IFaq>;
type EntityArrayResponseType = HttpResponse<IFaq[]>;

@Injectable({ providedIn: 'root' })
export class FaqService {
  public resourceUrl = SERVER_API_URL + 'api/admin/faqs';

  constructor(protected http: HttpClient) {}

  create(faq: IFaq): Observable<EntityResponseType> {
    return this.http.post<IFaq>(this.resourceUrl, faq, { observe: 'response' });
  }

  update(faq: IFaq): Observable<EntityResponseType> {
    return this.http.put<IFaq>(this.resourceUrl, faq, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFaq>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFaq[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  findAll(page: string): Observable<EntityArrayResponseType> {
    return this.http.get<IFaq[]>(`${SERVER_API_URL}api/faqs/${page}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
