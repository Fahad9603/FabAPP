import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

// #region Setup Compant
  GetCompany(){
    return this.http.get("http://localhost:5292/Company")
  }
  getCompanyById(company_code: string): Observable<any> {
    return this.http.get(`http://localhost:5292/Company/${company_code}`);
    
  }
  UpdateCompany(company_code: string, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    return this.http.put(`http://localhost:5292/Company/${company_code}`, updatedData, { headers });
  }
  deleteCompany(company_code: string): Observable<any> {
    return this.http.delete(`http://localhost:5292/Company/${company_code}`);
  }
  addCompany(companyData: any) {
    return this.http.post('http://localhost:5292/Company/', companyData);
  }

// #endregion
  

// #region Setup Product
GetProduct(){
    return this.http.get("http://localhost:5292/api/Product")
  }

getProductById(Product_code: string): Observable<any> {
    return this.http.get(`http://localhost:5292/api/Product/${Product_code}`);
    
  }
  UpdateProduct(Product_code: string, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    return this.http.put(`http://localhost:5292/api/Product/${Product_code}`, updatedData, { headers });
  }
  deleteProduct(Product_code: string): Observable<any> {
    return this.http.delete(`http://localhost:5292/api/Product/${Product_code}`);
  }
  addProduct(Product_code: any) {
    return this.http.post('http://localhost:5292/api/Product/', Product_code);
  }

// #endregion

// #region Billing Invoice
FetchBillbyCompany(){
return this.http.get("http://localhost:5292/api/BillInvoice")
  }
// #endregion  
//#region Create Invoice
FetchCompany(): Observable<string[]>{
  return this.http.get<string[]>("http://localhost:5292/api/Invoice")
    }
// #endregion
login(usrId: any, password: any) {
  return this.http.post(`http://localhost:5292/User`, { usrId, password }  );
}
}

