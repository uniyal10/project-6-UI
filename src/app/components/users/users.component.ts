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
  constructor(private userService:UserService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getUsers(params.get('id'))
    )).subscribe(users =>this.users=users)
  }

  deleteUserEvent(id:number){
    this.users = this.users.filter(user=>user.id != id)

    this.userService.deleteUser(id).subscribe(()=>console.log("user deleted sucessfully"))
  }

}
