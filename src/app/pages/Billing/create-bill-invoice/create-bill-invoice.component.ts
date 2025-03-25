import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatTableModule  } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSort } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../../service/master.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-bill-invoice',
  standalone: true,
  imports: [CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatDatepickerModule,MatNativeDateModule
      ],
  templateUrl: './create-bill-invoice.component.html',
  styleUrl: './create-bill-invoice.component.css'
})
export class CreateBillInvoiceComponent {
  
  lastNumber = 104;
  invoiceNumber = this.lastNumber + 1;

  currentDate: string;
  constructor() {
    const today = new Date();
    this.currentDate = today.toLocaleDateString('en-GB'); 
  }
  invoiceItems: any[] = [
    { itemName: '', unitPrice: 0, units: 0, totalPrice: 0 } 
  ];
  addRow() {
    const newId = this.invoiceItems.length + 1;
    this.invoiceItems.push({ id: newId, itemName: '', unitPrice: 0, units: 0, totalPrice: 0 });
  }
  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }
  getSubTotal(): number {
    return this.invoiceItems.reduce((acc, item) => acc + (item.unitPrice * item.units), 0);
  }
}
