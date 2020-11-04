import { Component, OnInit } from '@angular/core';
import {Customer} from '../../../Models/Customer'
import {CustomerService} from '../../services/customer.service'
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
 customers:Customer[]
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers=>{
      this.customers = customers
    })
  }
  deleteCustomerEvent(id:number){
    this.customers=this.customers.filter(customer=>customer.id != id)
    this.customerService.deleteCustomer(id).subscribe(()=>console.log("customer deleted sucessfully"))
  }
}
