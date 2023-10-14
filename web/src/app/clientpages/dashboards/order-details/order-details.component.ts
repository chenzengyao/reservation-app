import { Component, OnInit } from '@angular/core';
import { OrdersService} from "../../../core/services/orders.service";
import { Orders} from "../../../core/models/orders.models";
import { OrderItems} from "../../../core/models/orderItems.models";
import {dateStringToDateLocal} from "../../../core/helpers/helper";
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from "../../../core/models/payment.models";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor( private orderService: OrdersService,
               private router: Router,
               private activeRoute: ActivatedRoute,) { }

  breadCrumbItems: Array<{}>;
  orderID: number = 0;
  order: Orders = new Orders();
  orderItemsList: OrderItems[] = [];
  userName: string = "";
  totalAmount: number = 0;

  ngOnInit(): void {

    //Check for login user
    if (sessionStorage.getItem('email')==null){
      window.location.href = '/account/login';
    } else{
      true;
    }

    this.breadCrumbItems = [{ label: "Order" }, { label: "Add Orders", active: true },];

    this.activeRoute.params.subscribe(params => {
      this.orderID = params['orderID'];
      console.log("this order id: ", this.orderID);
      if (this.orderID == null) {
        this.router.navigate(["/user/orders/listing"]);
      }
    });

    this.orderService.userOrderByID(this.orderID).toPromise().then((res: any) => {
      if (res == null) {
        this.router.navigate(["/admin/orders/listing"]);
      }
      console.log("res: ", res);
      this.order = res;
      // if (res.reservation) {
      //   this.reservation = res.reservation
      //   this.reservation.reservation_dt = dateStringToDateLocal(res.reservation_dt);
      // }
      // if (res.delivery) {
      //   this.delivery = res.delivery;
      //   this.delivery.delivery_start_dt = dateStringToDateLocal(res.delivery.delivery_start_dt);
      //   this.delivery.delivery_completed_dt = dateStringToDateLocal(res.delivery.delivery_completed_dt);
      // }
      // this.userName = res.user.userName;
      this.orderItemsList = res.orderItemList;
      this.orderItemsList.forEach(item => {
        item['total'] = parseFloat(item.item_price) * item.order_quantity;
        this.totalAmount += (parseFloat(item.item_price) * item.order_quantity);
      });
    }).catch((err: any) => {
      console.error("err: ", err);
    });
  }

  setTotalAmount(index) {
    this.orderItemsList[index]["total"] = parseFloat(this.orderItemsList[index].item_price) * this.orderItemsList[index].order_quantity;
    // summ all total
    this.totalAmount = 0;
    this.orderItemsList.forEach(item => {
      this.totalAmount += item['total'];
    });
  }

  async removeOrderItem(index: number, orderItem: OrderItems) {
    if (orderItem.id) {
      // this.orderService.deleteOrderItem(orderItem.id).subscribe(res => {
      //   this.orderItems.splice(index, 1);
      // });
    }
    this.orderItemsList.splice(index, 1);
  }

  submitOrder(){
    this.router.navigate(['/user/orders/payment', this.orderID]);
  }
  goBack(){
    this.router.navigate(['/user/menu']);
  }

}
