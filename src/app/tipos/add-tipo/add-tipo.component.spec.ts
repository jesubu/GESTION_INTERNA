import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoComponent } from './add-tipo.component';

describe('AddTipoComponent', () => {
  let component: AddTipoComponent;
  let fixture: ComponentFixture<AddTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
