import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillInvoiceComponent } from './create-bill-invoice.component';

describe('CreateBillInvoiceComponent', () => {
  let component: CreateBillInvoiceComponent;
  let fixture: ComponentFixture<CreateBillInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBillInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBillInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
