import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {User} from '../../Models/User'


const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

   
  getUsers(id:string):Observable<User[]>{
     const url:string=`http://localhost:3000/customers/${id}/users`
     return this.http.get<User[]>(url)
  }
  getUser(id:string):Observable<User>{
    const url:string=`http://localhost:3000/users/${id}`
    return this.http.get<User>(url)
  }
  saveUser(id:number,user:any):Observable<any>{
    const url = `http://localhost:3000/users/${id}`
    return this.http.patch(url,user,httpOptions)
  }
  deleteUser(id:number):Observable<any>{
    const url=`http://localhost:3000/users/${id}`
    return this.http.delete(url,httpOptions)
  }
}
