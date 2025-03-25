import { Component, Inject, OnInit } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../../service/master.service';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-productdialog',
  standalone: true,
  imports: [CommonModule,
    MaterialModule,
    ReactiveFormsModule],
  templateUrl: './edit-productdialog.component.html',
  styleUrl: './edit-productdialog.component.css'
})
export class EditProductdialogComponent implements OnInit {
  editForm!: FormGroup; // Ensuring form initialization

  constructor(
    public dialogRef: MatDialogRef<EditProductdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private masterService: MasterService // Changed MasterService variable name to follow convention
  ) {}

  ngOnInit() {
    this.initializeForm(); // Initialize form first
    this.loadproductData();
  }

  initializeForm() {
    this.editForm = this.fb.group({
      FabricID: ['', Validators.required],
      FabricType: ['', Validators.required],
      WeightKG: ['', Validators.required],
      ColorStatus: ['', Validators.required],
      ProcessStage: ['', Validators.required]
    });
  }

  loadproductData() {

    if (!this.data?.product) {

      return;
    }

    this.masterService.getProductById(this.data.product).subscribe(
      (res) => {
    
        if (res.responseCode === "00" && res.detailData?.detail?.length > 0) {
          const product = res.detailData.detail[0]; 
    
          this.editForm.patchValue({
            FabricID: product.FabricID,
            FabricType: product.FabricType,
            WeightKG: product.WeightKG,
            ColorStatus: product.ColorStatus,
            ProcessStage: product.ProcessStage,
          });
        } else {
          console.error('No product data found or invalid response.');
        }
      },
      (err) => {
        console.error('Error fetching product data:', err);
      }
    );
    
    }

    save() {
      if (this.editForm.valid) {
        if (this.data?.product) {
    
          this.masterService.UpdateProduct(this.data.product, this.editForm.value).subscribe(
            (res) => {
              console.log('Update successful:', res);
              this.dialogRef.close(res);
            },
            (err) => {
              console.error('Update failed:', err);
            }
          );
        } else {
          
          this.masterService.addProduct(this.editForm.value).subscribe(
            (res) => {
              console.log('Insert successful:', res);
              this.dialogRef.close(res);
            },
            (err) => {
              console.error('Insert failed:', err);
            }
          );
        }
      }
    }
    
 
  close() {
    this.dialogRef.close();
  }
}
