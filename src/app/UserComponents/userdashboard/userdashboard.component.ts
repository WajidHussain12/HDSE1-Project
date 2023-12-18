import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private Service: ProductService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }


  UserName: any

  getUserDetails() {
    this.ActivatedRoute.params.subscribe((data: any) => {
      const userid = data['id']

      this.Service.getuserData(userid).subscribe((data: any) => {
        this.UserName =data['userName']
          console.log(data)
      });

    });
  }

}
