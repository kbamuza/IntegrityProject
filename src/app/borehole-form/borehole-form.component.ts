import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from "../data.service";
import { Borehole } from './Borehole';
import { BoreholeService } from '../borehole.service';

@Component({
  selector: 'app-borehole-form',
  templateUrl: './borehole-form.component.html',
  styleUrls: ['./borehole-form.component.css'],

})
export class BoreholeFormComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  lat = new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]);
  lng = new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]);
  elevation = new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]);
  

  getErrorMessage()
  {
    if(this.name.hasError('required'))
    {
    return 'You must enter a value';
    }
    else if(this.type.hasError('required'))
    {
    return 'Please enter a value';
    }
    else if(this.lat.hasError('required'))
    {
    return 'Please enter a value (WGS84 format)';
    }
    else if(this.lng.hasError('required'))
    {
      return 'Please enter a value (WGS84 format)';
    }
    else if(this.elevation.hasError('required'))
    {
      return 'Please enter a value';
    }
    else
      return ""; 
  }


  message:string;
  borehole = new Borehole();
  hidden = false;

  constructor(private  data: DataService, private boreholeService: BoreholeService) {}

  addBorehole(borehole): void {
    console.log('Adding: ', borehole);
    this.boreholeService.addBorehole(borehole)
      .subscribe(response => this.handleBoreholeAddition(response));
  }

  editBorehole(borehole): void {
    console.log('Editing: ', borehole);
    this.boreholeService.updateBorehole(borehole)
      .subscribe(response => this.handleBoreholeUpdate(response));
  }

  handleBoreholeAddition(response)
  {
    console.log(response);
  }

  handleBoreholeUpdate(response)
  {
    console.log(response);
  }


  onSubmit() {
    alert("Submitted!");
    console.log("borehole_id: " + this.borehole.borehole_id);
    if(this.borehole.borehole_id > 0)
    {
      this.editBorehole(this.borehole);
    }
    else
    {
      this.addBorehole(this.borehole);
    }
    this.hidden = true;
      
  }

  cancel()
  {
    this.hidden = true;
  }

  setFormFields(boreholeObj)
  {
    console.log("Form fields: ");
    if(typeof boreholeObj.borehole_name !== "undefined")
    {
      this.hidden = false;
    }
    this.borehole.borehole_id = boreholeObj.borehole_id;
    this.borehole.borehole_name = boreholeObj.borehole_name;
    this.borehole.borehole_type = boreholeObj.borehole_type;
    this.borehole.borehole_latitude = boreholeObj.borehole_latitude;
    this.borehole.borehole_longitude = boreholeObj.borehole_longitude;
    this.borehole.borehole_elevation = boreholeObj.borehole_elevation;
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.setFormFields(JSON.parse(message)));
  }

}
