import { Component, OnInit } from '@angular/core';
import {User} from "../../../Models/User"
import {UserService} from '../../services/user.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

   //properties
   users:User[]
  id:number
  isAdd:boolean
  customerId:string
  constructor(private userService:UserService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdd=false
   this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>
             this.userService.getUsers(params.get('id'))
        )).subscribe(users =>this.users=users)
  }

  deleteUserEvent(id:number){
    this.users = this.users.filter(user=>user.id != id)

    this.userService.deleteUser(id).subscribe(()=>console.log("user deleted sucessfully"))
  }
  addUser(){
this.isAdd=true
  }
  saveEvent(user:User){
   const id=user.id
    this.userService.saveUser(id,user).subscribe(msg=>{
      console.log(msg)
    })
  }

  cancelEvent(){
   this.isAdd=false
  }
  addUserEvent(user:User){
     this.isAdd=false
    this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>
             this.userService.addUser(params.get('id'),user)
        )).subscribe(()=>{
          this.users.push(user)
        }) 
  }

}
