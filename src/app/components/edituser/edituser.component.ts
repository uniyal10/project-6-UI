import { Component, OnInit } from '@angular/core';
import {User} from '../../../Models/User'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
   user:User
  constructor(private route: ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getUser(params.get('id'))
    )).subscribe(user=>this.user=user)
  }


  saveUser(id:number){
    const user = {
      firstname:this.user.firstname,
      middlename:this.user.middlename,
      lastname:this.user.lastname,
      email:this.user.email,
      phonenumber:this.user.phonenumber,
      role:this.user.role,
      address:this.user.address
    }
   this.userService.saveUser(id,user).subscribe(()=>console.log("updated user sucessfully"))
  }


}
