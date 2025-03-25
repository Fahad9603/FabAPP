import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';  
import {EditProductdialogComponent} from '../../pages/productsetup/edit-productdialog/edit-productdialog.component';

@Component({
  selector: 'app-productsetup',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MaterialModule],
  templateUrl: './productsetup.component.html',
  styleUrl: './productsetup.component.css'
})
export class ProductsetupComponent implements OnInit, AfterViewInit {
  masterSrc = inject(MasterService);
  dialog = inject(MatDialog); 
  displayedColumns: string[] = ['FabricID', 'FabricType', 'WeightKG', 'ColorStatus','ProcessStage','actions']; // Table Columns
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
        this.loadProduct();
      }
  
      loadProduct() {
        this.masterSrc.GetProduct().subscribe(
          (Res: any) => {
            const productData = Array.isArray(Res?.detailData?.detail) ? Res.detailData.detail : [];
            this.dataSource.data = productData;
          },
          (error) => {
            console.error("Error fetching companies:", error);
          }
        );
      }
  
      editProduct(product: any) {
        const dialogRef = this.dialog.open(EditProductdialogComponent, {
          width:'800px',
          data: {product: product}
        }); 
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          
            this.masterSrc.GetProduct().subscribe(() => {
              this.loadProduct(); 
  
            });
          }
        });
      }
      InsertProduct() {
        const dialogRef = this.dialog.open(EditProductdialogComponent, {
          width:'800px'
        }); 
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          
            this.masterSrc.GetProduct().subscribe(() => {
              this.loadProduct(); 
  
            });
          }
        });
      }
  
      deleteproduct(product_code: string) {
        if (confirm('Are you sure you want to delete this product?')) {
         
          console.log("Deleting product with code:",  product_code); 
          this.masterSrc.deleteProduct(product_code).subscribe(
            () => {
              this.loadProduct(); 
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
  