import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SponsorsService } from '../_services/sponsors.service';

@Injectable()
export class SponsorResolver implements Resolve<any> {

  constructor(private sponsorsService: SponsorsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.sponsorsService.getSingleSponsor(parseInt(route.paramMap.get('id')),)
  }
}
