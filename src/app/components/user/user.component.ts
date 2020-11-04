import { Component, OnInit,Input ,EventEmitter,Output} from '@angular/core';
import { User } from '../../../Models/User'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user:User
  
  @Output() deleteUserEvent:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  deleteUser(id:number){
    this.deleteUserEvent.emit(id)
  }

}
