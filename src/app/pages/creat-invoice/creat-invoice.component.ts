import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { MatTableModule  } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSort } from '@angular/material/sort';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-creat-invoice',
  standalone: true,
  imports: [CommonModule,
          MaterialModule,
          ReactiveFormsModule,
          FormsModule,
          MatTableModule,
          MatDatepickerModule,
          MatNativeDateModule,
          AsyncPipe,
          MatAutocompleteModule,
          MatInputModule,
          MatFormFieldModule],
  templateUrl: './creat-invoice.component.html',
  styleUrl: './creat-invoice.component.css'
})
export class CreatInvoiceComponent implements OnInit {
  lastNumber = 104;
  invoiceNumber = this.lastNumber + 1;
  firstControl = new FormControl<string>('');
  firstoption: string[] = [];
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  currentDate: string;

  constructor(private masterService: MasterService) {
    const today = new Date();
    this.currentDate = today.toLocaleDateString('en-GB');
  }

  ngOnInit() {
    this.masterService.FetchCompany().subscribe((data: any) => {
      if (data && data.detailData && Array.isArray(data.detailData.detail)) {
        this.firstoption = data.detailData.detail.map((company: { Company_Name: string }) => company.Company_Name);
      }
    console.log(data)
      this.filteredOptions = this.firstControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.firstoption.filter(option => option.toLowerCase().includes(filterValue));
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
}
