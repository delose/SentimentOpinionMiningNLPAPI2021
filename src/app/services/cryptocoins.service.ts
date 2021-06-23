import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NewscatcherSearch } from './newscatcher-search';

@Injectable({
    providedIn: 'root'
})
export class CryptoCoinsService {

    constructor(private http: HttpClient) { }

    coinNewsResults(topic: string, page: number) {

        let requestUrl = "https://newscatcher.p.rapidapi.com/v1/search";
        
        var httpParams: HttpParams = new HttpParams()
            // .set('lang', language)
            .set('q', topic)
            // .set('topic', category === "All" ? "" : category)
            // .set('sources', source === "All" ? "" : source)
            .set('page_size', "1")
            // .set('sort_by', "relevancy") // relevancy, rank, date
            .set('page', page)
            .set('media', "true")
            // .set('country', country)
            ;
            let httpHeaders: HttpHeaders = new HttpHeaders()
                .set('x-rapidapi-key', '308fee2777mshd9deaf3e6f7a1ecp1b5377jsn8665068261ea')
                .set('x-rapidapi-host', 'newscatcher.p.rapidapi.com');
                // .set('useQueryString', 'true');
    
            return this.http.get<NewscatcherSearch>(requestUrl, {headers: httpHeaders, params: httpParams});
    }

    mockCoinNewsResults(code: string) {
        
        if (code === "BTC") {
            return this.http.get<any>("assets/json/bitcoin.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "ETH") {
            return this.http.get<any>("assets/json/ethereum.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "USDT") {
            return this.http.get<any>("assets/json/tether.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "BNB") {
            return this.http.get<any>("assets/json/binance-coin.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "ADA") {
            return this.http.get<any>("assets/json/cardano.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "DOGE") {
            return this.http.get<any>("assets/json/dogecoin.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "XRP") {
            return this.http.get<any>("assets/json/xrp.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "USDC") {
            return this.http.get<any>("assets/json/usd-coin.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        } else if (code === "DOT") {
            return this.http.get<any>("assets/json/polkadot.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        // } else if (code === "UNI") {
            
        }

        return this.http.get<any>("assets/json/uniswap.json", {headers: new HttpHeaders(),  params: new HttpParams()});

    }


    mockSentiment() {
        // return this.http.get<any>("assets/json/sentiment-2.json", {headers: new HttpHeaders(),  params: new HttpParams()});
        return this.http.get<any>("assets/json/sentiment.json", {headers: new HttpHeaders(),  params: new HttpParams()});
    }
}
