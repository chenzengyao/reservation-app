import { Component, OnInit } from '@angular/core';
import { dataService } from "../../../dataService";
import { OrdersService } from "../../../core/services/orders.service";
import { OrderItems} from "../../../core/models/orderItems.models"
import { Orders } from "../../../core/models/orders.models"
import { MenusService } from "../../../core/services/menus.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', './orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private modalService: NgbModal,private dataService: dataService, private ordersService: OrdersService, private menuService: MenusService) { }

  email: string;
  ordersMap: OrderData[];
  date: String;
  ViewDetails: boolean[] = [];
  visible: boolean[] = [];
  total: number = 0;
  imagePath: String[];
  orderItems: OrderItems[];

  ngOnInit(): void {
    this.dataService.setCurrentEmail("liz@gmail.com");
    this.email = this.dataService.getCurrentEmail();

    this.ordersService.getOrder(this.email).subscribe((data: OrderData[]) => {
      this.ordersMap = data;
      this.ViewDetails = Array(data.length).fill(false);
      this.visible = Array(data.length).fill(false);
    });
  }


  toggleDetails(index: number) {
    this.ViewDetails[index] = !this.ViewDetails[index];
    this.visible[index] = !this.visible[index];
  }

  getTotal(orderList: OrderItems[]){
    this.total = 0;
    orderList.forEach(order =>{
      this.total += parseFloat(order.item_price) * order.order_quantity;
    })
    this.total = parseFloat(this.total.toFixed(2));
    return this.total;
  }

  openModal(content: any, data: OrderItems[]) {
    this.orderItems = data;
    this.modalService.open(content, { centered: true });
  }

}

interface OrderData {
  order: Orders;
  orderItems: OrderItems[];
}
