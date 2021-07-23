import { Injectable } from "@angular/core";
import { RestApiUrls } from "../_models/rest-api-urls";
import { CrudService } from "./crud.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  public countryList: Array<any>;

  constructor(private crudService: CrudService) { }

  getCountryList(onSuccess: any, onFail: any) {
    const req = this.crudService.get(RestApiUrls.countries.getList);
    req.subscribe(
      (data: any) => {
        this.countryList = data
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
