import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {Customer} from '../../../Models/Customer'
import {CustomerService} from '../../services/customer.service'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
   customerDetailsForm :any

   @Output() addCustomerEvent:EventEmitter<any> = new EventEmitter<any>()
@Output() handleCancelEvent:EventEmitter<any> =new EventEmitter<any>()
  constructor(private customerService:CustomerService) { }



  ngOnInit(): void {

this.buildCustomerForm()
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




saveEvent(){
  const customer={
    name:this.customerDetailsForm.get('name').value,
    website:this.customerDetailsForm.get('website').value,
   address:this.customerDetailsForm.get('address').value
  }
  this.addCustomerEvent.emit(customer)
  
}
handleCancel(){
this.handleCancelEvent.emit()
}
  
 
 

}
