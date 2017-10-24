import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasListComponent } from './incidencias-list.component';

describe('IncidenciasListComponent', () => {
  let component: IncidenciasListComponent;
  let fixture: ComponentFixture<IncidenciasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenciasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
