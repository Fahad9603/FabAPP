import { Component, Inject, OnInit } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../../service/master.service';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-company-dialog',
  standalone: true,
  templateUrl: './edit-company-dialog.component.html',
  styleUrls: ['./edit-company-dialog.component.css'],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EditCompanyDialogComponent implements OnInit {
  editForm!: FormGroup; // Ensuring form initialization

  constructor(
    public dialogRef: MatDialogRef<EditCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private masterService: MasterService // Changed MasterService variable name to follow convention
  ) {}

  ngOnInit() {
    this.initializeForm(); // Initialize form first
    this.loadCompanyData();
  }

  initializeForm() {
    this.editForm = this.fb.group({
      company_code: ['', Validators.required],
      Company_Name: ['', Validators.required],
      Mobile_No: ['', Validators.required],
      addresss: ['', Validators.required]
    });
  }

  loadCompanyData() {

    if (!this.data?.company) {

      return;
    }

    this.masterService.getCompanyById(this.data.company.company_code).subscribe(
      (res) => {
    ;
    
        if (res.responseCode === "00" && res.detailData?.detail?.length > 0) {
          const company = res.detailData.detail[0]; 
    
          this.editForm.patchValue({
            company_code: company.company_code,
            Company_Name: company.Company_Name,
            Mobile_No: company.Mobile_No,
            addresss: company.addresss
          });
        } else {
          console.error('No company data found or invalid response.');
        }
      },
      (err) => {
        console.error('Error fetching company data:', err);
      }
    );
    
    }

    save() {
      if (this.editForm.valid) {
        if (this.data?.company) {
    
          this.masterService.UpdateCompany(this.data.company.company_code, this.editForm.value).subscribe(
            (res) => {
              console.log('Update successful:', res);
              this.dialogRef.close(res);
            },
            (err) => {
              console.error('Update failed:', err);
            }
          );
        } else {
          
          this.masterService.addCompany(this.editForm.value).subscribe(
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
