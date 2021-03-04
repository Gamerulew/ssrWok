import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IDisciplineTopic} from "../model/discipline-topic.model";
import {IDisciplineTopicStatistics} from "../model/discipline-topic-statistics.model";
import {SERVER_API_URL} from "../../app.constants";
import {SharedFunctions} from "../shared.functions";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
type EntityResponseType = HttpResponse<IDisciplineTopic>;
type EntityArrayResponseType = HttpResponse<IDisciplineTopic[]>;
type EntityMapResponseType = HttpResponse<IDisciplineTopic[][]>;
type EntityArrayStatisticResponseType = HttpResponse<IDisciplineTopicStatistics[]>;

@Injectable({ providedIn: 'root' })
export class DisciplineTopicService {
  public resourceUrl = SERVER_API_URL + 'api/admin/disciplines/';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/disciplines/topics';
  public resourcePublicUrl = SERVER_API_URL + 'api/public/disciplines/';

  constructor(protected http: HttpClient, protected sharedFunctions: SharedFunctions) {}

  create(disciplineTopic: IDisciplineTopic): Observable<EntityResponseType> {
    return this.http.post<IDisciplineTopic>(`${this.resourceUrl}${disciplineTopic.discipline.id}/topics`, disciplineTopic, {
      observe: 'response'
    });
  }

  update(disciplineTopic: IDisciplineTopic): Observable<EntityResponseType> {
    return this.http.put<IDisciplineTopic>(`${this.resourceUrl}topics`, disciplineTopic, { observe: 'response' });
  }

  find(disciplineId: number, topicId: number): Observable<EntityResponseType> {
    // todo: entender como adicinoar os campos
    return this.http.get<IDisciplineTopic>(`${this.resourceUrl}${disciplineId}/topics/${topicId}`, {
      observe: 'response'
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisciplineTopic[]>(`${this.resourceUrl}topics`, { params: options, observe: 'response' });
  }

  delete(disciplineId: number, topicId: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${disciplineId}/topics/${topicId}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisciplineTopic[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  // getAllTopicByDisciplineOld(disciplineId: number): Observable<EntityArrayResponseType> {
  //   return this.http
  //     .get<IDisciplineTopic[]>(`${this.resourceUrl}${disciplineId}/topics`, { observe: 'response' })
  //     .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((disciplineTopic: IDisciplineTopic) => {
        if (disciplineTopic.topic) {
          disciplineTopic.topic.imageUrl = this.sharedFunctions.getImageDir() + disciplineTopic.topic.imageUrl;
        }
      });
    }
    return res;
  }

  getAllTopicByDiscipline(disciplineId: number): Observable<EntityMapResponseType> {
    return this.http.get<IDisciplineTopic[][]>(`${this.resourceUrl}${disciplineId}/topics`, { observe: 'response' });
  }

  getAllDisciplineTopicsStatisctByDiscipline(disciplineId: number): Observable<EntityArrayStatisticResponseType> {
    return this.http.get<IDisciplineTopicStatistics[]>(
      `${this.resourceUrl}${disciplineId}/topics/statistics?disciplineId=${disciplineId}`,
      { observe: 'response' }
    );
  }

  getAllTopicByPublicDiscipline(disciplineId: number | undefined): Observable<EntityMapResponseType> {
    return this.http.get<IDisciplineTopic[][]>(`${this.resourcePublicUrl}${disciplineId}/topics`, { observe: 'response' });
  }
}
