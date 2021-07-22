import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  constructor(private http: HttpClient) { }

  post(url: string, data: any) {
    return this.http.post<any>(environment.apiUrl + url, data);
  }

  get(url: string) {
    return this.http.get<any>(environment.apiUrl + url);
  }

  delete(url: string, id: number) {
    return this.http.delete<any>(environment.apiUrl + url + id);
  }
}
