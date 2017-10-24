import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEstadoComponent } from './add-estado.component';

describe('AddEstadoComponent', () => {
  let component: AddEstadoComponent;
  let fixture: ComponentFixture<AddEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
