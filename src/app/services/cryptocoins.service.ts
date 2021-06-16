import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CryptoCoinsService {

    constructor(private http: HttpClient) { }

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
