import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxnCardComponent } from './trxn-card.component';

describe('TrxnCardComponent', () => {
  let component: TrxnCardComponent;
  let fixture: ComponentFixture<TrxnCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrxnCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrxnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
