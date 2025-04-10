import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInterceptorComponent } from './auth.interceptor.component';

describe('AuthInterceptorComponent', () => {
  let component: AuthInterceptorComponent;
  let fixture: ComponentFixture<AuthInterceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInterceptorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
