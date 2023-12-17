import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboardnav',
  templateUrl: './userdashboardnav.component.html',
  styleUrls: ['./userdashboardnav.component.css']
})
export class UserdashboardnavComponent implements OnInit {
  constructor(private Router:Router) {

  }

  ngOnInit(): void {

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
