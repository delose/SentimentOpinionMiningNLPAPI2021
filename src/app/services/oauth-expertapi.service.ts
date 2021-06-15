import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OauthExpertapiService {

    constructor(private http: HttpClient) { }

    token() {
        
        let requestUrl = 'https://developer.expert.ai/oauth2/token';
            
        let httpParams: HttpParams = new HttpParams();

        let httpHeaders: HttpHeaders = new HttpHeaders();

        let body = {
            "username": "delossantos.eugene@gmail.com",
            "password": "Expert@1987"
        }

        return this.http.post<any>(requestUrl, body, {headers: httpHeaders,  params: httpParams});

    }

    mockToken() {
        return this.http.get<any>("assets/json/oauth2-token.json", {headers: new HttpHeaders(),  params: new HttpParams()});
    }
}
