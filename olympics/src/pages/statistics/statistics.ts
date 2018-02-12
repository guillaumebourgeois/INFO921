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

  private data = {
                    "distance": {"average": 0, "longest": 0, "shortest": 0},
                    "duration": {"average": 0, "longest": 0},
                    "proportions": {"ski": 0, "run": 0, "cycle": 0, "ride": 0, "walk": 0}
                  };

  private currentMonth: any;
  private currentYear: any;
  private currentDate: any;
  private months = [
                      {"id":1, "name":"January"},
                      {"id":2, "name":"February"},
                      {"id":3, "name":"March"},
                      {"id":4, "name":"April"},
                      {"id":5, "name":"May"},
                      {"id":6, "name":"June"},
                      {"id":7, "name":"July"},
                      {"id":8, "name":"August"},
                      {"id":9, "name":"September"},
                      {"id":10, "name":"October"},
                      {"id":11, "name":"November"},
                      {"id":12, "name":"December"}
                    ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public statisticsService: StatisticsService, public userService: UserService) {
    this.userService.getCurrentUser().subscribe(user => {
      this.idUser = user.idUser;

      this.currentDate = new Date();
      this.currentMonth = this.currentDate.getMonth() + 1;
      this.currentYear = this.currentDate.getFullYear();

      this.getDatas();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');

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
  }

  private drawDuration (){
    this.durationChart = new Chart(this.durationCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: ["Longest", "Average", "Shortest"],
            datasets: [{
                label: 'Duration',
                data: [
                        this.data.duration.longest,
                        this.data.duration.average,
                        this.data.duration.shortest
                      ],
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
  }

  private drawDistance (){
    this.distanceChart = new Chart(this.distanceCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels: ["Longest", "Average"],
          datasets: [{
              label: 'Distance',
              data: [
                      this.data.distance.longest,
                      this.data.distance.average
                    ],
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
  }

  private drawProportions (){
    this.proportionsChart = new Chart(this.proportionsCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ["Ski", "Run", "Cycle", "Ride", "Walk"],
          datasets: [{
              label: 'Proportions',
              data: [
                      this.data.proportions.ski,
                      this.data.proportions.run,
                      this.data.proportions.cycle,
                      this.data.proportions.ride,
                      this.data.proportions.walk
                    ],
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

  private getDatas (){
      let startMonth = "" + this.currentYear + "-" + (this.currentMonth < 10 ? "0" + this.currentMonth : this.currentMonth);

      this.statisticsService.getStatistics(this.idUser, startMonth, startMonth).subscribe(data => {
        this.data = data.monthly[0];

        if (this.data.duration.longest == null)
           this.data.duration.longest = 0;
        if (this.data.duration.average == null)
           this.data.duration.average = 0;
        if (this.data.duration.shortest == null)
            this.data.duration.shortest= 0;

        if (this.data.distance.longest == null)
           this.data.distance.longest = 0;
        if (this.data.distance.average == null)
           this.data.distance.average = 0;

        if (this.data.proportions.ski == null)
          this.data.proportions.ski = 0;
        if (this.data.proportions.run == null)
          this.data.proportions.run = 0;
        if (this.data.proportions.cycle == null)
          this.data.proportions.cycle = 0;
        if (this.data.proportions.ride == null)
          this.data.proportions.ride = 0;
        if (this.data.proportions.walk == null)
          this.data.proportions.walk = 0;

        this.drawDuration();
        this.drawDistance();
        this.drawProportions();
      })
  }

  private onChange (){
    this.getDatas();
  }

  private ChangeDisplay(mode: number) {
    this.statsDisplayed = mode;
  }
}
