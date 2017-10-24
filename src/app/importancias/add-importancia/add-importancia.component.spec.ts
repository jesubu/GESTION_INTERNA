import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImportanciaComponent } from './add-importancia.component';

describe('AddImportanciaComponent', () => {
  let component: AddImportanciaComponent;
  let fixture: ComponentFixture<AddImportanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImportanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImportanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
