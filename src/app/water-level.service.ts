import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { WaterLevel } from './water-level-form/WaterLevel'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
})};

@Injectable({
  providedIn: 'root'
})
export class WaterLevelService {

  waterLevel = new WaterLevel();
  private messageSource = new BehaviorSubject(JSON.stringify(this.waterLevel));
  currentMessage = this.messageSource.asObservable();

  constructor(
    private http: HttpClient,) { }

    getWaterLevels (borehole_id): Observable<string>
    {
      var waterLevel = this.http.post<string>("http://localhost:3000/waterLevels/getWaterLevels", JSON.stringify({"borehole_id": borehole_id}), httpOptions);
      return waterLevel;
    }

    addWaterLevel (waterLevel): Observable<string>
    {
      var result = this.http.post<string>("http://localhost:3000/waterLevels/addWaterLevel", JSON.stringify({"waterLevel": waterLevel}), httpOptions);
      return result;
    }

    updateWaterLevel (waterLevel): Observable<string>
    {
      var result = this.http.post<string>("http://localhost:3000/waterLevels/updateWaterLevel", JSON.stringify({"waterLevel": waterLevel}), httpOptions);
      return result;
    }

    deleteWaterLevel (water_level_id): Observable<string>
    {
      var result = this.http.post<string>("http://localhost:3000/waterLevels/deleteWaterLevel", JSON.stringify({"water_level_id": water_level_id}), httpOptions);
      return result;
    }

    changeMessage(message: string) {
      this.messageSource.next(message)
    }
}
