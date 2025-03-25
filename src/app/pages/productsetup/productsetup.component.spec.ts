import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsetupComponent } from './productsetup.component';

describe('ProductsetupComponent', () => {
  let component: ProductsetupComponent;
  let fixture: ComponentFixture<ProductsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
