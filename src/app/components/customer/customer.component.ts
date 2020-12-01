import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
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
   customerDetailsForm :any
   emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
   
  constructor(private customerService:CustomerService) { }

isDisplay:string
isEdit:boolean

  ngOnInit(): void {
    this.isDisplay=''
    this.isEdit=false
this.buildCustomerForm()
 this.populateCustomersForm()
  }

  populateCustomersForm = () => {
    if(!this.customer || Object.keys(this.customer).length < 1)
    return
 this.customerDetailsForm.get('name').setValue(this.customer.name)
   this.customerDetailsForm.get('website').setValue(this.customer.website)
   this.customerDetailsForm.get('address').setValue(this.customer.address)
  } 


  buildCustomerForm=()=>{
    this.customerDetailsForm = new FormGroup({
         'name':new FormControl('',[Validators.required]),
         'website':new FormControl('',[Validators.required]),
         'address': new FormControl('',[Validators.required])
        })
  }
  checkRequiredCondition(control: any):boolean{
    return (control.touched || control.dirty) && !control.value && control.invalid
  }

  checkInvalidCondition(control: any):boolean{
    return  (control.touched || control.dirty) && control.invalid && control.value
  }


editEvent(){
  this.isDisplay=null
  this.isEdit=true
}

saveEvent(id:number){
  this.isDisplay = ''
  this.isEdit  = false
  const customer={
    id:id,
    name:this.customerDetailsForm.get('name').value,
    website:this.customerDetailsForm.get('website').value,
   address:this.customerDetailsForm.get('address').value
  }
  this.customerService.saveCustomer(id,customer).subscribe((msg)=>{
    console.log(msg)
  })
}
handleCancel(){
  this.isDisplay=''
  this.isEdit=false
  this.customerDetailsForm.get('name').setValue(this.customer.name)
  this.customerDetailsForm.get('website').setValue(this.customer.website)
this.customerDetailsForm.get('address').setValue(this.customer.address)
}
  
 
 deleteCustomer(id:number){
   this.deleteCustomerEvent.emit(id)
 }

}
