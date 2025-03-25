import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatInvoiceComponent } from './creat-invoice.component';

describe('CreatInvoiceComponent', () => {
  let component: CreatInvoiceComponent;
  let fixture: ComponentFixture<CreatInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
