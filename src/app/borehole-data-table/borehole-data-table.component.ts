import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { DataService } from "../data.service";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BoreholeService } from '../borehole.service';

@Component({
  selector: 'app-borehole-data-table',
  templateUrl: './borehole-data-table.component.html',
  styleUrls: ['./borehole-data-table.component.css']
})
export class BoreholeDataTableComponent implements OnInit {

  boreholes = [];
  message:string;

  constructor(private  data: DataService, private boreholeService: BoreholeService) { }

  getBoreholes(): void {
    this.boreholeService.getBoreholes()
      .subscribe(response => this.handleBoreholes(response));
  }

  deleteBorehole(row): void {
    console.log('Delete: ', row);
    this.boreholeService.deleteBorehole(row.borehole_id)
      .subscribe(response => this.handleBoreholeDeletion(response));
  }

  handleBoreholeDeletion(response)
  {
    console.log(response);
  }

  handleBoreholes(boreholes)
  {
    //console.log(boreholes);
    //var jsonBoreholes = JSON.parse(boreholes);
    //this.boreholes = jsonBoreholes;
    this.boreholes = boreholes;
    this.dataSource = boreholes;
    this.dataSource = new MatTableDataSource(this.boreholes);
    this.dataSource.sort = this.sort;
    console.log(this.boreholes);
  }

  addWaterLevel(row)
  {
    this.data.changeMessage(JSON.stringify(row));
  }

  viewWaterLevels(row)
  {
    this.data.changeMessage(JSON.stringify(row));
  }

editBorehole(row) {
  console.log('Edit: ', row);
  this.data.changeMessage(JSON.stringify(row));
}


  displayedColumns: string[] = ['borehole_name', 'borehole_type', 'borehole_latitude', 'borehole_longitude', 'borehole_elevation', 'select'];
  dataSource = new MatTableDataSource(this.boreholes);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getBoreholes();
    this.dataSource.sort = this.sort;
    this.data.currentMessage.subscribe(message => this.message = message)
  }
}