import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MpesaPaymentPage } from './mpesa-payment.page';

describe('OrderPlacedPage', () => {
  let component: MpesaPaymentPage;
  let fixture: ComponentFixture<MpesaPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpesaPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MpesaPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
