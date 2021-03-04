import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IExercise} from "./exercise.model";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {SERVER_API_URL} from "app/app.constants";

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private http: HttpClient) {
  }

  saveImg(file: File): Observable<HttpResponse<{}>> {
    const data = new FormData();
    data.append('file', file);
    return this.http
      .post<IExercise[]>(`${SERVER_API_URL}/api/public/storage/topicos/`, data, {observe: 'response'});
  }
}
