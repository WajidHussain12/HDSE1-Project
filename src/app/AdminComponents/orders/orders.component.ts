import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private requestService: AdminService, private HttpClient: HttpClient) { }
  OrderData: any;

  ngOnInit(): void {
    this.requesrOrderData();
  }

  requesrOrderData() {
    this.requestService.getOrdersData().subscribe((data) => {
      // this.OrderData.push(data);
      // console.log(this.OrderData)
      this.OrderData = data;
      console.log(this.OrderData)

    });
  }

  productData: any
  orderProducts(orderid: number, customer_ID: number) {

    console.log(orderid, customer_ID)
    this.requestService.getOrderProducts(orderid, customer_ID).subscribe((data: any) => {
      this.productData = data
      console.log(data)
    })



  }


}
