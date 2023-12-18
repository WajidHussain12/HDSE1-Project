import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userdashboardnav',
  templateUrl: './userdashboardnav.component.html',
  styleUrls: ['./userdashboardnav.component.css']
})
export class UserdashboardnavComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private Service: ProductService, private Router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }


  UserName: any

  getUserDetails() {
    this.ActivatedRoute.params.subscribe((data: any) => {
      const userid = data['id']

      this.Service.getuserData(userid).subscribe((data: any) => {
        this.UserName = data['userName']
        console.log("NavBar Data",data)
      });

    });
  }

  userlogout() {
    localStorage.removeItem("UserName")
    localStorage.removeItem("usertoken")
    localStorage.removeItem("cart")
    localStorage.removeItem("checkout")
    localStorage.removeItem("userid")
    this.Router.navigate([''])
  }

}
