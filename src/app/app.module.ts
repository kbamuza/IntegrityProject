import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModules} from './material-modules';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';

import { BoreholeDataTableComponent } from './borehole-data-table/borehole-data-table.component';
import { WaterLevelDataTableComponent } from './water-level-data-table/water-level-data-table.component';
import { WaterLevelFormComponent } from './water-level-form/water-level-form.component';
import { BoreholeFormComponent } from './borehole-form/borehole-form.component';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    BoreholeDataTableComponent,
    WaterLevelDataTableComponent,
    WaterLevelFormComponent,
    BoreholeFormComponent,
    ChartComponent, 
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
