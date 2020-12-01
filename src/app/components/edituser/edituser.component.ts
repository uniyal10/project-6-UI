import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from "../../../models/User"
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter()
  @Output() addUserEvent: EventEmitter<any> = new EventEmitter()
  userDetailsForm: FormGroup;
  phonePattern:RegExp = /^[0-9]{10}$/i


  emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  // firstName: string
  // middleName: string
  // lastName: string
  // email: string
  // phoneNumber: string
  // role: string
  // address: string
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  checkRequiredCondition(control: any){
    return (control.touched || control.dirty) && !control.value && control.invalid;
  }

  checkInvalidCondition(control: any){
    return  (control.touched || control.dirty) && control.invalid && control.value
  }

  buildForm = () => {
    this.userDetailsForm = this.fb.group({
      'firstName': new FormControl('',[Validators.required]),
      'middleName': new FormControl('',),
      'lastName': new FormControl('',),
      'email':new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      'phoneNumber': new FormControl('',[Validators.required,Validators.pattern(this.phonePattern)]),
      'role': new FormControl('',[Validators.required]),
      'address': new FormControl('',[Validators.required])
    });
  }

  onCancel() {
    this.cancelEvent.emit()
  }

  onSave() {
    if(this.userDetailsForm.invalid){
      return
    }
    const user = {
      firstname: this.userDetailsForm.get('firstName').value,
      middlename: this.userDetailsForm.get('middleName').value,
      lastname:this.userDetailsForm.get('lastName').value,
      email: this.userDetailsForm.get('email').value,
      phonenumber:String( this.userDetailsForm.get('phoneNumber').value),
      role: this.userDetailsForm.get('role').value,
      address: this.userDetailsForm.get('address').value
    }
    this.addUserEvent.emit(user)
  }
}
