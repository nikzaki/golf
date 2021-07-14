import { Injectable } from "@angular/core";
import { RestApiUrls } from "src/app/_models/rest-api-urls";
import { CrudService } from "src/app/_services/crud.service";

@Injectable({
  providedIn: "root",
})
export class SponsorsService {
  constructor(private crudService: CrudService) {}

  getListData(data: any, onSuccess: any, onFail: any) {
    var req = this.crudService.get(
      RestApiUrls.sponsors.getList + "?activeOrInactive=B&pageSize=10&pageNo=1"
    );
    req.subscribe(
      (data: any) => {
        console.log("data ::  ==>", data);
        if (onSuccess) {
          onSuccess(data);
        }
      },
      (error: any) => {
        console.log("error ::  ==>", error);
        if (onFail) {
          onFail(error && error.error);
        }
      }
    );
  }
}
