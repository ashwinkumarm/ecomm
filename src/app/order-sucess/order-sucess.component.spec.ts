import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSucessComponent } from './order-sucess.component';

describe('OrderSucessComponent', () => {
  let component: OrderSucessComponent;
  let fixture: ComponentFixture<OrderSucessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSucessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
