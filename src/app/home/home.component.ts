import { Component, OnInit, HostListener } from '@angular/core';
import { OauthExpertapiService } from '../services/oauth-expertapi.service';
import { OauthToken } from '../services/oauth-token';
import { SentimentExpertapiService } from '../services/sentiment-expertapi.service';
import { SentimentJson } from '../services/sentiment-json';
import { Coin } from '../services/coin-json';
import { CryptoCoinsService } from '../services/cryptocoins.service';
import { NewscatcherSearch, Article } from '../services/newscatcher-search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  shownArticles: Array<Article> = [];
  shownArticlesCount = 0;
  positiveSentimentCount = 0;
  negativeSentimentCount = 0;

  @HostListener("window:scroll", [])
  onScroll(): void {
    // console.log("this.shownArticlesCount < this.newscatcherSearchArticles.length: " + this.shownArticlesCount + " + " + this.newscatcherSearchArticles.length);
    if (this.bottomReached() && this.shownArticlesCount < this.newscatcherSearchArticles.length - 1) {
      this.shownArticlesCount++;
      this.shownArticles.push(this.newscatcherSearchArticles[this.shownArticlesCount]);
      // expert.ai sentiment API call
      this.sentimentExpertApiService.mockSentiment().subscribe(
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
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  ngOnInit(): void {
    this.init();
  }

  populateFeed(code: string) {
    this.cryptocoinsService.mockCoinNewsResults(code).subscribe(
      data => {
        let newscatcherSearch: NewscatcherSearch = data;
        this.newscatcherSearchArticles = newscatcherSearch.articles;
        this.shownArticlesCount = 0;
        this.shownArticles = [];
        this.shownArticles.push(this.newscatcherSearchArticles[this.shownArticlesCount]);
        this.negativeSentimentCount = 0;
        this.positiveSentimentCount = 0;
      }, error => { 

      }
    );
  }

  init() {

    // check if there is no token

    // attempt first request

    // if 401, call oauth2 token API

    // TODO: uncomment for the actual API call
    // this.oauthExpertapiService.token().subscribe(
    this.oauthExpertapiService.mockToken().subscribe(
      data => {
        let tempToken: OauthToken = data;
        this.token = "success: " + JSON.stringify(tempToken);
        this.sentimentExpertApiService.mockSentiment().subscribe(
          data => {
            this.sentiment = JSON.stringify(data);
            let tempSentiment: SentimentJson = data;
            console.log("success tempSentiment: " + tempSentiment.data.sentiment.overall);
          }, error => {
            this.sentiment = JSON.stringify(error);
            let tempSentiment: SentimentJson = error;
            console.log("fail tempSentiment: " + JSON.stringify(tempSentiment.data.sentiment.overall));
          }
        );
      }, error => {
        let tempToken: OauthToken = error;
        this.token = tempToken.error?.text;
        // TODO: uncomment for the actual API call
        // this.sentimentExpertApiService.sentiment(this.token,
          // "I love you so much! I think this is going to work out.").subscribe(
        this.sentimentExpertApiService.mockSentiment().subscribe(
            data => {
              this.sentiment = JSON.stringify(data);
              let tempSentiment: SentimentJson = data;
              console.log("success tempSentiment: " + tempSentiment.data.sentiment.overall);
            }, error => {
              this.sentiment = JSON.stringify(error);
              let tempSentiment: SentimentJson = error;
              console.log("fail tempSentiment: " + JSON.stringify(tempSentiment.data.sentiment.overall));
            }
          );
      }
    );
    
  }

}
