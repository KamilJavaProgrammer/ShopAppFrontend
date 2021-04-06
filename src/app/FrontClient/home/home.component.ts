import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductServiceService} from '../../product-service.service';
import {DatePipe} from '@angular/common';
import {DataserviceService} from '../../dataservice.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  time =  10;
  div: HTMLElement;
  div1: HTMLElement;


  constructor(private dataserviceService: DataserviceService, private router: Router, private productService: ProductServiceService) {

  }

  ngOnInit(): void {
    this.div1 = document.getElementById('navbar123');
    this.div1.style.display = 'none';

    this.Count();
  }




  public Count(): void {


    const p =  setInterval(args => {

      if (this.time < 7 && this.time > 0)
      {
        this.div = document.getElementById('navTime');
        this.div.style.color = 'red';
        this.time--;
      }
     else if (this.time === 0){
        clearInterval(p);
        this.router.navigateByUrl('/login');
      }
      else
      {
        this.time--;

      }




    }, 1000);
  }


  }






