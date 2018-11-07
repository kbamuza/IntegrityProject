import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoreholeFormComponent } from './borehole-form.component';

describe('BoreholeFormComponent', () => {
  let component: BoreholeFormComponent;
  let fixture: ComponentFixture<BoreholeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoreholeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoreholeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
