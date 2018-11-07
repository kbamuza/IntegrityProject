import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Borehole } from './borehole-form/Borehole'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  borehole = new Borehole();
  private messageSource = new BehaviorSubject(JSON.stringify(this.borehole));
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}