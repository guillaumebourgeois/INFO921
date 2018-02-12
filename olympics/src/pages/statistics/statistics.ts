import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';

import { StatisticsService } from '../../providers/api/services/statistics.service';
import { UserService       } from '../../providers/api/services/user.service';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  @ViewChild('durationCanvas') durationCanvas;
  @ViewChild('distanceCanvas') distanceCanvas;
  @ViewChild('proportionsCanvas') proportionsCanvas;

  private statsDisplayed: number = 0;

  private idUser: number;

  private durationChart: any;
  private distanceChart: any;
  private proportionsChart: any;

  private data: any;

  private currentMonth: any;
  private currentYear: any;
  private currentDate: any;
  private months = [
                      {"id":1, "month":"January"},
                      {"id":2, "month":"February"},
                      {"id":3, "month":"March"},
                      {"id":4, "month":"April"},
                      {"id":5, "month":"May"},
                      {"id":6, "month":"June"},
                      {"id":7, "month":"July"},
                      {"id":8, "month":"August"},
                      {"id":9, "month":"September"},
                      {"id":10, "month":"October"},
                      {"id":11, "month":"November"},
                      {"id":12, "month":"December"}
                    ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public statisticsService: StatisticsService, public userService: UserService) {
    this.userService.getCurrentUser().subscribe(user => {
      this.idUser = user.idUser;

      this.currentDate = new Date();

      this.getDatas(this.currentDate.getMonth() + 1, this.currentDate.getFullYear());
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');

    this.durationChart = new Chart(this.durationCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: ["Longest", "Average", "Shortest"],
            datasets: [{
                label: 'Duration',
                data: [17572, 10040, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    this.distanceChart = new Chart(this.distanceCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels: ["Longest", "Average"],
          datasets: [{
              label: 'Distance',
              data: [7654, 1218, 0],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });

    /*this.distanceChart = new Chart(this.distanceCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [65, 59, 80, 81, 56, 55, 40],
                  spanGaps: false,
              }
          ]
      }
    });*/

    this.proportionsChart = new Chart(this.proportionsCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ["Ski", "Run", "Cycle", "Ride", "Walk"],
          datasets: [{
              label: 'Proportions',
              data: [28.5, 57.1, 7.1, 0, 7.1],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                  "#36A2EB"
              ]
          }]
      }
    });

  }

  private getDatas(month: number, year: number){
    if ((month == this.currentDate.getMonth() + 1) && (year == this.currentDate.getFullYear())) {
      this.currentMonth = month;
      this.currentYear = year;

      let startMonth = Date.parse(month + ", 1, " + year);

      return this.statisticsService.getStatistics(this.idUser, startMonth, Date.now()).subscribe(data => {
        return data;
      })
    }
    else {
      this.currentMonth = month;
      this.currentYear = year;

      let date = new Date (year, month - 1, 0);

      let startMonth = Date.parse(month + ", 1, " + year);
      let endMonth = Date.parse(month + ", " + date.getDate() + ", " + year);

      return this.statisticsService.getStatistics(this.idUser, startMonth, endMonth).subscribe(data => {
        return data;
      })
    }
  }

  private onChange (){
    this.getDatas(this.currentMonth, this.currentYear);
  }

  private ChangeDisplay(mode: number) {
    this.statsDisplayed = mode;
  }
}
