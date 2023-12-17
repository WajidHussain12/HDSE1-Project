// import { adminAuthenticated } from 'src/app/Components/adminlogin/adminlogin.component';
// import { adminauthGuard } from 'src/app/Guard/AdminGuard/adminauth.guard';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { AdminAuthenticated } from 'src/app/Guard/AdminGuard/adminlogin';
import { FormBuilder } from '@angular/forms';
import { AdminLoginService } from 'src/app/Services/AdminLogin/admin-login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// import {AdminAuthenticated}

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private Adminservice: AdminLoginService, private formBuilder: FormBuilder, private Route: Router) {
  }

  wrongCredentials: boolean = false;
  // AdminAuthenticated = new BehaviorSubject<boolean>(false)
  // AdminAuthenticated:boolean=false

  ngOnInit(): void {
  }



  AdminId: any


  Adminloginform = this.formBuilder.group({
    adminemail: [''],
    adminpassword: [''],
  });

  @Output() adminAuthenticated: EventEmitter<any> = new EventEmitter();


  AdminLogin() {
    var formvalues = this.Adminloginform.value as {
      adminemail: string
      adminpassword: string
    }

    const formdata = new FormData();
    formdata.append('adminemail', formvalues.adminemail);
    formdata.append('adminpassword', formvalues.adminpassword);

    this.Adminservice.adminLogin(formdata).subscribe(
      (data: any) => {
        this.Adminservice.setAdminlogiStatus(true);
        // console.log(data);
        const d: any = [data]
        const Authenticate = d[0]['authentication']
        const Status = d[0]['status']


        const adminId = d[0]['adminId']
        const jwttoken = d[0]['jwttoken']
        localStorage.setItem("admintoken",jwttoken)
        console.log(jwttoken)

        this.AdminId = adminId

        this.Adminservice.ResponseAdminid = adminId


        // localStorage.setItem('adminId', adminId)
        // console.log("adminId", adminId)


        // this.AdminAuthenticated = Status
        // this.Adminservice.adminlogiStatus = true

        // this.adminAuthenticated.emit(true)
        // console.log(Authenticate)
        // console.log(Status)
        // Assuming 'token' is a unique identifier for the logged-in user
        // localStorage.setItem('token', data.token);

        // localStorage.setItem("isLoggedIn", Status)
        // localStorage.setItem("Logged", 'success')
        this.Route.navigate(['/admin/dashboard'])
        this.wrongCredentials = false

      },
      (error) => {
        // Handle error responses here
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.log("Wrong Password");
            this.wrongCredentials = true
          } else {
            console.error("An error occurred:", error);
          }
        }
      }
    );


    // this.Adminservice.adminLogin(formdata).subscribe((data: any) => {
    //   console.log(data)

    //    if (data == 401) {
    //     console.log("Wrong Password")
    //   }

    //   // if (data == 401) {
    //   //   console.log("Wrong Password")
    //   // }
    //   // else {
    //   //   const d: any = [data]
    //   //   const Authenticate = d[0]['authentication']
    //   //   const Status = d[0]['status']

    //   //   console.log(Authenticate)
    //   //   console.log(Status)

    //   //   localStorage.setItem("isLoggedIn", Status)
    //   //   this.Route.navigate(['/admin/dashboard'])
    //   // }
    //   // AdminAuthenticated
    // });


  }

}
