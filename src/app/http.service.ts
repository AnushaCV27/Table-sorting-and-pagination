import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'https://api.filter.com/items';

  constructor(private http: HttpClient) {}

  getItems(page: number, pageSize: number): Observable<any> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
}
