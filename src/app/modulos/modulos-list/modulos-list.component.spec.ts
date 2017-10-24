import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosListComponent } from './modulos-list.component';

describe('ModulosListComponent', () => {
  let component: ModulosListComponent;
  let fixture: ComponentFixture<ModulosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
