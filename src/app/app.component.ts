import { Component } from '@angular/core';
import { TwitterService } from './services/twitter.service';
import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Twitter Dashboard'; 
  twitterNumber : any;
  twitterLastUpdate : any;
  myChart : any;
  hashTagCountryChart : any;
  selectCountry : Array<String> = [];
  selectTwitt : Array<String> = [];
  
  constructor(private twitterService : TwitterService){
    this.getCountTwitts();
    this.getCountTwittsByCountry();
  }
  

  getCountTwitts(){
    this.twitterService.countAllTweets().subscribe(resultado => {
      this.twitterNumber = resultado;
    },
    error => {
      console.log(JSON.stringify(error));
    });
  }

  getCountTwittsByCountry(){
    this.twitterService.tweetsByCountry().subscribe(resultado => {
      console.log(resultado.labels);
      resultado.labels.forEach(element => {
        this.selectCountry.push(element);            
      });
      
      this.myChart = new  Chart("myChart", {
        type: 'horizontalBar',
        data: {
          labels: resultado.labels,
          datasets: [{
              label: '# de twitts',
              data: resultado.values,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 169, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {        
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
      });
    },
    error => {
      console.log(JSON.stringify(error));
    });
  }


  changeCountry(e) {
    console.log(e.target.value);
    this.mostPopularTwittsByCountry(e.target.value);
  }

  changeTwitt(e) {
    console.log(e.target.value);
    //this.mostPopularTwittsByCountry(e.target.value);
  }


  mostPopularTwittsByCountry(country : String){
    this.twitterService.mostPopularTweetsByCountry(country).subscribe(resultado => {
      resultado.labels.forEach(element => {
        this.selectTwitt.push(element);            
      });
      this.hashTagCountryChart = new  Chart("hashTagCountryChart", {
        type: 'line',
        data: {
          labels: resultado.labels,
          datasets: [{
              label: '# de twitts',
              data: resultado.values,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 169, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        onClick: function(e) {
          var element = this.getElementAtEvent(e);
          if (element.length) {
             console.log(element[0])
          }
       },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
      });
    },
    error => {
      console.log(JSON.stringify(error));
    });
  }

}

