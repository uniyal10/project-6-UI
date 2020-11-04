import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Customer} from '../../Models/Customer'

const httpOptions = {
  headers:new HttpHeaders({
    'Content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

   getCustomers():Observable<Customer[]>{
     const url = 'http://localhost:3000/customers'
     return this.http.get<Customer[]>(url)
   }
   getCustomer(id:string):Observable<Customer>{
    const url =  `http://localhost:3000/customers/${id}`
    return this.http.get<Customer>(url)
  }


  saveCustomer(id:number,customer:Customer):Observable<any>{
    const url = `http://localhost:3000/customers/${id}`
    return this.http.patch(url,JSON.stringify(customer),httpOptions)
  }


  deleteCustomer(id:number):Observable<any>{
    const url = `http://localhost:3000/customers/${id}`
    return this.http.delete(url,httpOptions)
  }

}
