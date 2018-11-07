import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterLevelFormComponent } from './water-level-form.component';

describe('WaterLevelFormComponent', () => {
  let component: WaterLevelFormComponent;
  let fixture: ComponentFixture<WaterLevelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterLevelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
