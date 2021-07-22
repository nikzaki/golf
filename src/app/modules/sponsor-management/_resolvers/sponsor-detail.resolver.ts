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
export class SponsorDetailResolver implements Resolve<boolean> {
  constructor(private sponsorsService: SponsorsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.sponsorsService.getSponsorDetail(
      parseInt(route.paramMap.get("id"))
    );
  }
}
