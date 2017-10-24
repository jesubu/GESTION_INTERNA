import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportanciaListComponent } from './importancia-list.component';

describe('ImportanciaListComponent', () => {
  let component: ImportanciaListComponent;
  let fixture: ComponentFixture<ImportanciaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportanciaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportanciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
