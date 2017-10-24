import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposListComponent } from './tipos-list.component';

describe('TiposListComponent', () => {
  let component: TiposListComponent;
  let fixture: ComponentFixture<TiposListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
