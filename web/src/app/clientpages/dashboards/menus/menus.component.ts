import { Component, OnInit } from '@angular/core';
import { MenusService } from "../../../core/services/menus.service";
import { Menu } from "../../../core/models/menu.models";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderItems} from "../../../core/models/orderItems.models";
import { Orders } from "src/app/core/models/orders.models";

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss', './menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private menusService: MenusService) {
  }

  menu: Menu[] = [];
  selectedCategory: string="All";
  order: Orders = new Orders();
  orderItemsList: OrderItems[] = [];
  totalAmount=0;
  quantity: number;
  remark: String;

  ngOnInit(): void {
    this.menusService.getAllMenuUser().subscribe(data =>{
      this.menu = data.body as Menu[];
    })
  }

  addToOrder(item: any, quantity: any, remark: any) {
    let orderItem = new OrderItems();
    orderItem.item_id = item.itemID;
    orderItem.order_remark = remark;
    orderItem.order_quantity = quantity;
    orderItem.item_name = item.item_name;
    orderItem.item_price = item.item_price;
    orderItem.item_category = item.item_category;

    this.orderItemsList.push(orderItem);
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



  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
