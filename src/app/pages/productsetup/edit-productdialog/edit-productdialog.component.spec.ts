import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductdialogComponent } from './edit-productdialog.component';

describe('EditProductdialogComponent', () => {
  let component: EditProductdialogComponent;
  let fixture: ComponentFixture<EditProductdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
