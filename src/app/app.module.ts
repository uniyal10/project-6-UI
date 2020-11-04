import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import {HttpClientModule} from '@angular/common/http';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component'
import { RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { EditComponent } from './components/edit/edit.component';
import { EdituserComponent } from './components/edituser/edituser.component'


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CustomersComponent,
    CustomerComponent,
    UserComponent,
    EditComponent,
    EdituserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
   
{path:'user/:id', component:UsersComponent},
{path:'editCustomer/:id',component:EditComponent},
{path:'editUser/:id',component:EdituserComponent},
{path:'',component:CustomersComponent}

      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
