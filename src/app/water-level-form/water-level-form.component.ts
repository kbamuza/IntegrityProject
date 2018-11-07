import { Component, OnInit } from '@angular/core';
import { WaterLevel } from './WaterLevel';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WaterLevelService } from '../water-level.service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-water-level-form',
  templateUrl: './water-level-form.component.html',
  styleUrls: ['./water-level-form.component.css']
})
export class WaterLevelFormComponent implements OnInit {

  message:string;
  waterLevel = new WaterLevel();
  hidden = true;
  date = "TheDate";

  dateValue = new FormControl('', [Validators.required]);
  reading = new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]);
  

  getErrorMessage()
  {
    if(this.dateValue.hasError('required'))
    {
    return 'You must enter a value';
    }
    else if(this.reading.hasError('required'))
    {
      return 'Please enter a value';
    }
    else
      return ""; 
  }

  constructor(private waterLevelService: WaterLevelService, private dataService: DataService) { }

  addWaterLevel(waterLevel): void {
    console.log('Adding: ', waterLevel);
    this.waterLevelService.addWaterLevel(waterLevel)
      .subscribe(response => this.handleWaterLevelAddition(response));
  }

  editWaterLevel(waterLevel): void {
    console.log('Editing: ', waterLevel);
    this.waterLevelService.updateWaterLevel(waterLevel)
      .subscribe(response => this.handleWaterLevelUpdate(response));
  }

  handleWaterLevelAddition(response)
  {
    console.log(response);
  }

  handleWaterLevelUpdate(response)
  {
    console.log(response);
  }


  onSubmit() {
    alert("Thanks for submitting! Data: " + JSON.stringify(this.waterLevel));
    console.log("WaterLevelID: " + this.waterLevel.water_level_id);
    if(this.waterLevel.water_level_id > 0)
    {
      this.editWaterLevel(this.waterLevel);
      
    }
    else
    {
      this.addWaterLevel(this.waterLevel);
    }
    
    this.hidden = true;
  }

  cancel()
  {
    this.hidden = true;
  }

  setFormFields(waterLevelObj)
  {
    if(waterLevelObj.water_level_id > 0)
    {
      this.hidden = false;
    }
    this.waterLevel.borehole_id = waterLevelObj.borehole_id;
    this.waterLevel.water_level_date = waterLevelObj.water_level_date;
    this.waterLevel.water_level_reading = waterLevelObj.water_level_reading;
    this.waterLevel.water_level_id = waterLevelObj.water_level_id;

    if(typeof this.waterLevel.water_level_date !== "undefined")
    {
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var dateObj = new Date(waterLevelObj.water_level_date);
      var weekDay = days[dateObj.getDay()];
      var dateString = String(dateObj.getDate()) + " " + months[dateObj.getMonth()] + " " + String(dateObj.getFullYear());
      this.date = dateString;
    }
    
    console.log();
  }

  setBoreholeID(boreholeObj)
  {
    if(boreholeObj.borehole_id > 0)
    {
      this.hidden = false;
      this.waterLevel.borehole_id = boreholeObj.borehole_id;
      console.log("boreholeID IS: " + this.waterLevel.borehole_id);
    }
    
  }

  ngOnInit() {
    this.waterLevelService.currentMessage.subscribe(message => this.setFormFields(JSON.parse(message)));
    this.dataService.currentMessage.subscribe(message => this.setBoreholeID(JSON.parse(message)));
  }

}
