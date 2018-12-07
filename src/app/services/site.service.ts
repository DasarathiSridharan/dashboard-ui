import SiteInfo from '../models/site.models';

import { Observable, of } from 'rxjs';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Response} from '@angular/http';
import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

@Injectable()
export class SiteService {

api_url = 'http://localhost:3000';
siteUrl = this.api_url+'/api/sites';

constructor (
    private http: HttpClient
) {}

createSite(site: SiteInfo): Observable <any> {
    return this.http.post(this.siteUrl,site);
}

getSites(): Observable <SiteInfo[]> {
    console.log(this.siteUrl);
    return this.http.get(this.siteUrl)
    .pipe(map(res => {
        return res["data"].docs as SiteInfo[];
    }))
}

editSite(site:SiteInfo) {
    let editUrl = this.siteUrl;
    return this.http.put(editUrl, site);
}

deleteSite(id:string) {
    let deleteUrl = this.siteUrl+'/'+id;
    console.log(deleteUrl);
    return this.http.delete(deleteUrl)
        .pipe(map(res=> {
            return res;
        }))
}

private handleError(error:any):Promise <any> {
    console.error('An error occurred',error);
    return Promise.reject(error.message || error);
}
}
