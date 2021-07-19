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
      RestApiUrls.sponsors.getList + "?activeOrInactive=" +  data.activeOrInactive +"&pageSize=" + data.pageSize + "&pageNo=" + data.pageNo + "&search=" + data.search
    );
    req.subscribe(
      (data: any) => {
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
