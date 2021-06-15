import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SentimentExpertapiService {

    constructor(private http: HttpClient) { }

    sentiment(token: string, text: string) {
        
        let requestUrl = 'https://nlapi.expert.ai/v2/analyze/standard/en/sentiment';
            
        let httpParams: HttpParams = new HttpParams();

        let httpHeaders: HttpHeaders = new HttpHeaders()
            .append("Authorization", "Bearer " + token);

        let body = {
            "document": {
                "text": text
            }
        }

        return this.http.post<any>(requestUrl, body, {headers: httpHeaders,  params: httpParams});

    }


    mockSentiment() {
        // return this.http.get<any>("assets/json/sentiment-2.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        return this.http.get<any>("assets/json/sentiment.json", {headers: new HttpHeaders(),  params: new HttpParams()});
    }
}
