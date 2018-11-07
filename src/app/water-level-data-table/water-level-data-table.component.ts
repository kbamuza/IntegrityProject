import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import { DataService } from "../data.service";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { WaterLevelService } from '../water-level.service';

@Component({
  selector: 'app-water-level-data-table',
  templateUrl: './water-level-data-table.component.html',
  styleUrls: ['./water-level-data-table.component.css']
})
export class WaterLevelDataTableComponent implements OnInit {

  waterLevels = [];
  message:string;

  constructor(private waterLevelService: WaterLevelService, private dataService: DataService) { }

  getWaterLevels(borehole): void {
    
    console.log("Water Table fetching: " + borehole);
    this.waterLevelService.getWaterLevels(borehole.borehole_id)
      .subscribe(response => this.handleWaterLevels(response));
  }

  handleWaterLevels(waterLevels)
  {
    // var jsonWaterLevels = JSON.parse(waterLevels);
    // this.waterLevels = jsonWaterLevels;
    this.waterLevels = waterLevels;
    this.dataSource = waterLevels;
    this.dataSource = new MatTableDataSource(this.waterLevels);
    this.dataSource.sort = this.sort;
    console.log("Table Data: " + this.waterLevels);
  }

editWaterLevel(row) {
  console.log('Edit: ', row);
  this.waterLevelService.changeMessage(JSON.stringify(row));
}

deleteWaterLevel(row): void {
  console.log('Delete: ', row);
  this.waterLevelService.deleteWaterLevel(row.water_level_id)
    .subscribe(response => this.handleWaterLevelDeletion(response));
}

getDate(dateTime)
{
  if(typeof dateTime !== "undefined")
  {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dateObj = new Date(dateTime);
    var weekDay = days[dateObj.getDay()];
    var dateString = String(dateObj.getDate()) + " " + months[dateObj.getMonth()] + " " + String(dateObj.getFullYear());
    //this.date = dateString;
    return dateString;
  }
  
}

handleWaterLevelDeletion(response)
{
  console.log(response);
}

  displayedColumns: string[] = ['water_level_date', 'water_level_reading', 'select'];
  dataSource = new MatTableDataSource(this.waterLevels);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    //this.getWaterLevels();
    this.dataSource.sort = this.sort;
    this.waterLevelService.currentMessage.subscribe(message => this.message = message)
    this.dataService.currentMessage.subscribe(message => this.getWaterLevels(JSON.parse(message)));
  }
}