import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import {AuthGuard} from '../../../auth.guard';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  adminName: string;
  authGuard: AuthGuard;

  constructor(authGuard: AuthGuard) {
    this.authGuard = authGuard;
  }

  ngOnInit(): void {
    this.adminName = this.authGuard.DecodeJwt();
    this.CreateChart();
  }


  CreateChart(): void{
    const canvas = document.getElementById('chart-sales-dark') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');


    const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset

      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sprzedaż okresowa',
          backgroundColor: '#525f7f',
          borderColor: '#525f7f',
          data: [0, 10, 5, 2, 20, 30, 45],
          fill: false,


        }]

      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        },


        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks : {
              fontSize: 14
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
            },
            ticks : {
              fontSize: 14
            }
          }]
        }

      }
    });
    ( chart.canvas.parentNode as HTMLElement).style.height = '350px';
    ( chart.canvas.parentNode as HTMLElement).style.width = '94%';
    ( chart.canvas.parentNode as HTMLElement).style.backgroundColor = '#172b4d';
    ( chart.canvas.parentNode as HTMLElement).style.paddingTop = '40px';


  }
}
