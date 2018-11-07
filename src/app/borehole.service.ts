import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
export class BoreholeService {

  constructor(
    private http: HttpClient) { }

    getBoreholes (): Observable<string>
    {
      var boreholes = this.http.get<string>("http://localhost:3000/boreholes/getBoreholes");
      return boreholes;
    }

    addBorehole (borehole): Observable<string>
    {
      var result = this.http.post<string>("http://localhost:3000/boreholes/addBorehole", JSON.stringify({"borehole": borehole}), httpOptions);
      return result;
    }

    updateBorehole (borehole): Observable<string>
    {
      var result = this.http.post<string>("http://localhost:3000/boreholes/updateBorehole", JSON.stringify({"borehole": borehole}), httpOptions);
      return result;
    }

    deleteBorehole (borehole_id): Observable<string>
    {
      var result = this.http.post<string>("http://localhost:3000/boreholes/delete", JSON.stringify({"borehole_id": borehole_id}), httpOptions);
      return result;
    }
/////////////////////////////////////////////////////////////////////////
    
}
