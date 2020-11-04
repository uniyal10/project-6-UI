import { Component, OnInit } from '@angular/core';
import {Customer} from '../../../Models/Customer'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {CustomerService} from '../../services/customer.service'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 
   customer:Customer


  constructor(private route: ActivatedRoute,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.customerService.getCustomer(params.get('id'))
    )).subscribe(customer =>this.customer=customer)
  }

  saveCustomer(id:number){
    this.customerService.saveCustomer(id,this.customer).subscribe(()=>console.log('updated sucessfully'))
  }

}
