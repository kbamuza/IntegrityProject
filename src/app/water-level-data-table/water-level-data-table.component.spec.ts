import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterLevelDataTableComponent } from './water-level-data-table.component';

describe('WaterLevelDataTableComponent', () => {
  let component: WaterLevelDataTableComponent;
  let fixture: ComponentFixture<WaterLevelDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterLevelDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterLevelDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
