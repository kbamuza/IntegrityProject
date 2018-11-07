import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { DataService } from "../data.service";
import { WaterLevelService } from '../water-level.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {   
     

    message:string;
    dates: number[] = [];
    readings: number[] = [];
    boreholeName = "";
    hidden = true;
  
  constructor(private waterLevelService: WaterLevelService, private dataService: DataService) { }

  ngOnInit() {
    // this.getWaterLevels();
    this.waterLevelService.currentMessage.subscribe(message => this.message = message)
    this.dataService.currentMessage.subscribe(message => this.getWaterLevels(JSON.parse(message)))
  }

  getWaterLevels(borehole): void {

    this.boreholeName = borehole.borehole_name;
    console.log("Chart Fetching: " + borehole.borehole_id);
    this.waterLevelService.getWaterLevels(borehole.borehole_id)
      .subscribe(response => this.handleWaterLevels(response));
  }

  handleWaterLevels(waterLevels)
  {
    if(waterLevels.length > 0)
    {
      this.hidden = false;
    }
    this.dates = [];
    this.readings = [];
    this.options.series = [];

    var dataPoints = {
      name: '',
      data: []
    };

    dataPoints.name = "Readings for: " + this.boreholeName + " [mbgl]";
    
    //console.log(waterLevels);

    var point = [];
    var dateObj = new Date();
    for(var i = 0; i < waterLevels.length ;i++)
    {
      dateObj = new Date(waterLevels[i].water_level_date)
      
      point.push(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
      point.push(waterLevels[i].water_level_reading);
      console.log(point);
      dataPoints.data.push(point);
      point = [];

    }

    dataPoints.data.sort(function(a, b){return a[0] - b[0]});
    // console.log("sorted data:");
    // console.log(dataPoints.data);

    //dataPoints.data = this.readings;
    this.options.series.push(dataPoints);
    this.chart = new Chart(this.options);
  }


  options = {
    chart: {
      type: 'line'
    },
    title: {
      text: this.boreholeName
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { 
          month: '%e. %b',
          year: '%b'
      },
      title: {
          text: 'Date'
      }
  },
    credits: {
      enabled: false
    },
    
    series: [
      
    ]
  }

  chart = {};

}


