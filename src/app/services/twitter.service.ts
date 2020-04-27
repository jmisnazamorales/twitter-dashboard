import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TwitterService{

constructor(private httpClient : HttpClient){}

countAllTweets(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/tweets/count");
}

tweetsByCountry(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/tweets/total/country/find");
}

mostPopularTweetsByCountry(country : String ): Observable<any>{
    return this.httpClient.get("http://localhost:8080/tweets/" + country + "/find");
}

}