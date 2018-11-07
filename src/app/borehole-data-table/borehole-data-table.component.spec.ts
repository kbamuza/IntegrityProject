import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoreholeDataTableComponent } from './borehole-data-table.component';

describe('BoreholeDataTableComponent', () => {
  let component: BoreholeDataTableComponent;
  let fixture: ComponentFixture<BoreholeDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoreholeDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoreholeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
