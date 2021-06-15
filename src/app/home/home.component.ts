import { Component, OnInit } from '@angular/core';
import { OauthExpertapiService } from '../services/oauth-expertapi.service';
import { OauthToken } from '../services/oauth-token';
import { SentimentExpertapiService } from '../services/sentiment-expertapi.service';
import { SentimentJson } from '../services/sentiment-json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private oauthExpertapiService: OauthExpertapiService,
    private sentimentExpertApiService: SentimentExpertapiService) { }

  token: any;
  sentiment: any;

  ngOnInit(): void {
    this.init();
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
