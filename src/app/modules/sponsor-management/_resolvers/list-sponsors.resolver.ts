import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { SponsorsService } from "../_services/sponsors.service";

@Injectable({
  providedIn: "root",
})
export class ListSponsorsResolver implements Resolve<boolean> {
  constructor(private sponsorsService: SponsorsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.sponsorsService.getListData({
      activeOrInactive: "B",
      pageSize: 10,
      pageNo: 1,
      search: "",
    });
  }
}
