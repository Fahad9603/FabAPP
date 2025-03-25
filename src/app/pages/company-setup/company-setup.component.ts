  import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';  
  import { MasterService } from '../../service/master.service';
  import { CommonModule } from '@angular/common';
  import { MaterialModule } from '../../material.module';
  import { MatDialogModule } from '@angular/material/dialog';
  import { HttpClientModule } from '@angular/common/http';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { EditCompanyDialogComponent  } from './edit-company-dialog/edit-company-dialog.component'; 

  @Component({
    selector: 'app-company-setup',
    standalone: true,
    imports: [CommonModule, HttpClientModule, MaterialModule, MatDialogModule],
    templateUrl: './company-setup.component.html',
    styleUrls: ['./company-setup.component.css']
  })
  export class CompanySetupComponent implements OnInit, AfterViewInit {
    masterSrc = inject(MasterService);
    dialog = inject(MatDialog); 
    displayedColumns: string[] = ['company_code', 'Company_Name', 'Mobile_No', 'addresss', 'actions']; // Table Columns
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
      this.loadCompanies();
    }

    loadCompanies() {
      this.masterSrc.GetCompany().subscribe(
        (Res: any) => {
          const companyData = Array.isArray(Res?.detailData?.detail) ? Res.detailData.detail : [];
          this.dataSource.data = companyData;
        },
        (error) => {
          console.error("Error fetching companies:", error);
        }
      );
    }

    editCompany(company: any) {
      const dialogRef = this.dialog.open(EditCompanyDialogComponent, {
        width:'800px',
        data: {company: company}
      }); 
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        
          this.masterSrc.GetCompany().subscribe(() => {
            this.loadCompanies(); 

          });
        }
      });
    }
    InsertCompany() {
      const dialogRef = this.dialog.open(EditCompanyDialogComponent, {
        width:'800px'
      }); 
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        
          this.masterSrc.GetCompany().subscribe(() => {
            this.loadCompanies(); 

          });
        }
      });
    }

    deleteCompany(company_code: string) {
      if (confirm('Are you sure you want to delete this company?')) {
       
        console.log("Deleting company with code:",  company_code); 
        this.masterSrc.deleteCompany(company_code).subscribe(
          () => {
            this.loadCompanies(); 
          },
          (err) => {
            console.error('Delete failed:', err);
          }
        );
      }
    }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }
