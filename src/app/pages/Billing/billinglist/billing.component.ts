import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule,
      MaterialModule,
      ReactiveFormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}
    masterSrc = inject(MasterService);
    dialog = inject(MatDialog); 
    displayedColumns: string[] = ['Delivery_Date', 'Slip_Number','Company_Name','Fabric','Rolls','Weights','Rate','Amount'	, 'actions']; // Table Columns
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
      this.loadCompBills();
    }

    loadCompBills() {
      this.masterSrc.FetchBillbyCompany().subscribe(
        (Res: any) => {
          const companyBillData = Array.isArray(Res?.detailData?.detail) ? Res.detailData.detail : [];
          this.dataSource.data = companyBillData;
        },
        (error) => {
          console.error("Error fetching companies:", error);
        }
      );
    }

    // editCompany(company: any) {
    //   const dialogRef = this.dialog.open(EditCompanyDialogComponent, {
    //     width:'800px',
    //     data: {company: company}
    //   }); 
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
        
    //       this.masterSrc.GetCompany().subscribe(() => {
    //         this.loadCompanies(); 

    //       });
    //     }
    //   });
    // }
    // InsertCompany() {
    //   const dialogRef = this.dialog.open(EditCompanyDialogComponent, {
    //     width:'800px'
    //   }); 
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
        
    //       this.masterSrc.GetCompany().subscribe(() => {
    //         this.loadCompanies(); 

    //       });
    //     }
    //   });
    // }

    // deleteCompany(company_code: string) {
    //   if (confirm('Are you sure you want to delete this company?')) {
       
    //     console.log("Deleting company with code:",  company_code); 
    //     this.masterSrc.deleteCompany(company_code).subscribe(
    //       () => {
    //         this.loadCompanies(); 
    //       },
    //       (err) => {
    //         console.error('Delete failed:', err);
    //       }
    //     );
    //   }
    // }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }
    navigateToBillInvoice() {
      this.router.navigate(['/GeneraetBill']);
    }

  summaryCards = [
    { title: 'Total', value: 4 },
    { title: 'Paid', value: 2 },
    { title: 'Pending', value: 1 },
    { title: 'Overdue', value: 1 }
  ];
}
