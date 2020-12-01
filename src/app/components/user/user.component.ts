import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from "../../../models/User"
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: any
  //  @Output() editEvent: EventEmitter<any> = new EventEmitter()
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter()
  @Output() saveEvent: EventEmitter<any> = new EventEmitter()

  isEdit = false
  isDisplay :string
  isValidFirstName = true
  isValidNumber = true
  isValidEmail = true

  phonePattern:RegExp = /^[0-9]{10}$/i
  emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  userDetailForm: FormGroup
  // firstName: string
  // middleName: string
  // lastName: string
  // email: string
  // phoneNumber: string
  // role: string
  // address: string
  constructor() { }

  ngOnInit(): void {
    this.isDisplay = ""
    this.buildUserForm()
    this.populateUserForm()
    // this.firstName = this.user.firstname
    // this.middleName = this.user.middlename
    // this.lastName = this.user.lastname
    // this.email = this.user.email
    // this.phoneNumber = '' + this.user.phonenumber
    // this.role = this.user.role
    // this.address = this.user.address
  }

  populateUserForm = () => {
    if(!this.user || Object.keys(this.user).length < 1)
    return

    this.userDetailForm.get('firstName').setValue(this.user.firstname);
    this.userDetailForm.get('middleName').setValue(this.user.middlename);
    this.userDetailForm.get('lastName').setValue(this.user.lastname);
    this.userDetailForm.get('email').setValue(this.user.email);
    this.userDetailForm.get('phoneNumber').setValue(this.user.phonenumber);
    this.userDetailForm.get('role').setValue(this.user.role);
    this.userDetailForm.get('address').setValue(this.user.address);
  } 
   

 checkRequiredCondition(control: any):boolean{
    return (control.touched || control.dirty) && !control.value && control.invalid
  }

  checkInvalidCondition(control: any):boolean{
    return  (control.touched || control.dirty) && control.invalid && control.value
  }

  buildUserForm = () => {
    this.userDetailForm = new FormGroup({
      'firstName': new FormControl('',[Validators.required]),
      'middleName': new FormControl(''),
      'lastName': new FormControl(''),
      'email':new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      'phoneNumber': new FormControl('',[Validators.required,Validators.pattern(this.phonePattern)]),
      'role': new FormControl('',[Validators.required]),
      'address': new FormControl('',[Validators.required])
    });
  }

  // onEdit(id: number) {
  //   this.editEvent.emit(id)
  // }

  onEdit(){
     this.isEdit = true
     this.isDisplay = null
  }
  onDelete(id: number) {
    // console.log(id)
    this.deleteEvent.emit(id)
  }

  onSave(id:number){
    if(this.userDetailForm.invalid)
    return;

    this.isEdit = false
    this.isDisplay = ""
    const user = {
      id: id,
      firstname: this.userDetailForm.get('firstName').value,
      middlename: this.userDetailForm.get('middleName').value,
      lastname:this.userDetailForm.get('lastName').value,
      email: this.userDetailForm.get('email').value,
      phonenumber: String(this.userDetailForm.get('phoneNumber').value),
      role: this.userDetailForm.get('role').value,
      address: this.userDetailForm.get('address').value
    }
    this.saveEvent.emit(user)
  }
  onCancel(){
    this.isEdit = false
    this.isDisplay = ""
    this.userDetailForm.get('firstName').setValue(this.user.firstname);
    this.userDetailForm.get('middleName').setValue(this.user.middlename);
    this.userDetailForm.get('lastName').setValue(this.user.lastname);
    this.userDetailForm.get('email').setValue(this.user.email);
    this.userDetailForm.get('phoneNumber').setValue(String(this.user.phonenumber));
    this.userDetailForm.get('role').setValue(this.user.role);
    this.userDetailForm.get('address').setValue(this.user.address);
  }
}
