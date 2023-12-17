import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    this.checkAdmintoken()
    this.checkUsertoken()
  }

  title = 'icecream';

  checkAdmintoken() {
    const token = localStorage.getItem('admintoken')
    const jwtHelper = new JwtHelperService();

    if (jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('admintoken');
    }
  }



  checkUsertoken() {
    const token = localStorage.getItem('usertoken')
    const UserName = localStorage.getItem('UserName')
    const jwtHelper = new JwtHelperService();

    if (jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('usertoken');
      if(UserName){
        localStorage.removeItem('UserName');
      }
    }
  }


}
