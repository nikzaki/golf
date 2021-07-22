import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { RestApiUrls } from "src/app/_models/rest-api-urls";
import { CrudService } from "src/app/_services/crud.service";
import { throwError as observableThrowError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SponsorsService {
  constructor(private crudService: CrudService) {}

  getListData(data: any) {
    return this.crudService
      .get(
        `${RestApiUrls.sponsors.getList}?activeOrInactive=${
          data.activeOrInactive
        }&pageSize=${data.pageSize}&pageNo=${data.pageNo}&search=${
          data.search ? data.search : ""
        }`
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  getSponsorDetail(id: number) {
    return this.crudService.get(`${RestApiUrls.sponsors.getList}/${id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("handleError error --> ", error);
    return observableThrowError(error || "Server error");
  }

  delete(data: any, onSuccess: any, onFail: any) {
    var req = this.crudService.delete(data.apiMethod, data.id);
    req.subscribe(
      (data: any) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
      (error: any) => {
        if (onFail) {
          onFail(error && error.error);
        }
      }
    );
  }

  addEditSponsor(data: any, id: string, onSuccess: any, onFail: any){
    var req = this.crudService.post(RestApiUrls.sponsors.getList + id, data);
    req.subscribe(
      (data: any) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
      (error: any) => {
        if (onFail) {
          onFail(error && error.error);
        }
      }
    );
  }
  
}
