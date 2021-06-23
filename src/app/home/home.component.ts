import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { OauthExpertapiService } from '../services/oauth-expertapi.service';
import { OauthToken } from '../services/oauth-token';
import { SentimentExpertapiService } from '../services/sentiment-expertapi.service';
import { SentimentJson } from '../services/sentiment-json';
import { Coin } from '../services/coin-json';
import { CryptoCoinsService } from '../services/cryptocoins.service';
import { NewscatcherSearch, Article } from '../services/newscatcher-search';
import { Subscription, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private oauthExpertapiService: OauthExpertapiService,
    private sentimentExpertApiService: SentimentExpertapiService,
    private cryptocoinsService: CryptoCoinsService) { }

  token: any;
  sentiment: any;
  top10MarketcapCrypto: Array<Coin> = [
    {name: "Bitcoin", code: "BTC"},
    {name: "Ethereum", code: "ETH"},
    {name: "Tether", code: "USDT"},
    {name: "Binance Coin", code: "BNB"},
    {name: "Cardano", code: "ADA"},
    {name: "Dogecoin", code: "DOGE"},
    {name: "XRP", code: "XRP"},
    {name: "USD Coin", code: "USDC"},
    {name: "Polkadot", code: "DOT"},
    {name: "Uniswap", code: "UNI"},
  ];
  newscatcherSearchArticles: Array<Article> = [];
  // shownArticles: Array<Article> = [];
  // shownArticlesCount = 0;
  positiveSentimentCount = 0;
  negativeSentimentCount = 0;
  throttle = 0;
  distance = 2;
  page = 1;

  tokenObservable: Observable<any> | undefined;
  newsPopulateObservable: Observable<any> | undefined;
  initialSubscription: Subscription | undefined;
  selectedCoin: string = "Bitcoin";

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    // this.tokenObservable;
    // this.newPopulateSubs?.unsubscribe;
    this.initialSubscription?.unsubscribe();
  }

  init() {

    // two API calls using forkJoin
    // 1. token
    // 2. news populate
    this.selectedCoin = "Bitcoin";

    this.oauthExpertapiService.token().subscribe(data => {
      console.log("block 1: " + JSON.stringify(this.token));
    }, data2 => {
      let tempToken: OauthToken = data2;
      this.token = tempToken;
    });
    
  }

  onScroll(): void {

    // TWO apis called:
    // 1. newscatcher
    // 2. expert.ai > sentiment API
    this.cryptocoinsService.coinNewsResults(this.selectedCoin, ++this.page).subscribe(data => {
      let newscatcherSearch: NewscatcherSearch = data;
      this.newscatcherSearchArticles.push(...newscatcherSearch.articles);
      this.sentimentExpertApiService.sentiment(this.token?.error?.text, newscatcherSearch.articles[0].summary + " " + newscatcherSearch.articles[0].title).subscribe(
        data => {
          this.sentiment = JSON.stringify(data);
          let tempSentiment: SentimentJson = data;
          this.negativeSentimentCount += tempSentiment.data.sentiment.negativity;
          this.positiveSentimentCount += tempSentiment.data.sentiment.positivity;
      }, error => {
        console.log("unable to fetch sentiment due to " + JSON.stringify(error));
      });
    }, error => {
      console.log("unable to fetch due to " + JSON.stringify);
    });


  }

  populateFeed(code: string) {
    this.selectedCoin = code;
    this.page = 1;
    this.cryptocoinsService.coinNewsResults(code, this.page).subscribe(
    // this.cryptocoinsService.mockCoinNewsResults(code).subscribe(
      data => {
        let newscatcherSearch: NewscatcherSearch = data;
        this.newscatcherSearchArticles = newscatcherSearch.articles;
        this.negativeSentimentCount = 0;
        this.positiveSentimentCount = 0;

        this.sentimentExpertApiService.sentiment(this.token?.error?.text, newscatcherSearch.articles[0].summary + " " + newscatcherSearch.articles[0].title).subscribe(
          data => {
            this.sentiment = JSON.stringify(data);
            let tempSentiment: SentimentJson = data;
            this.negativeSentimentCount += tempSentiment.data.sentiment.negativity;
            this.positiveSentimentCount += tempSentiment.data.sentiment.positivity;
            console.log("success tempSentiment: " + tempSentiment.data.sentiment.overall);
          }, error => {
            this.sentiment = JSON.stringify(error);
            let tempSentiment: SentimentJson = error;
            console.log("fail tempSentiment: " + JSON.stringify(tempSentiment.data.sentiment.overall));
          }
        );

      }, error => { 

      }
    );


  }

}
