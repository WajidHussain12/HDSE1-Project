import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private requestService: AdminService) { }
  OrderData: any ;

  ngOnInit(): void {
    this.requesrOrderData();
  }

  requesrOrderData() {
    this.requestService.getOrdersData().subscribe((data) => {
      // this.OrderData.push(data);
      // console.log(this.OrderData)
      this.OrderData=data;
      console.log(this.OrderData)

    });
  }

}
