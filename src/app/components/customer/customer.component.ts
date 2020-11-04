import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import {Customer} from '../../../Models/Customer'
import {CustomerService} from '../../services/customer.service'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
   @Input() customer:Customer
   @Output() deleteCustomerEvent:EventEmitter<any> = new EventEmitter<any>() 
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    console.log(this.customer)
  }
 
 deleteCustomer(id:number){
   this.deleteCustomerEvent.emit(id)
 }

}
