import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/models/menu.models';
import { OrderItems } from 'src/app/core/models/orderItems.models';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.scss']
})
export class AddOrdersComponent implements OnInit {

  constructor() { }

  breadCrumbItems: Array<{}>;
  orderItems: any[] = [];
  searchItem: string = '';
  searchDisabled: boolean = true;
  totalAmount: number = 0;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Add Orders', active: true }];
  }

  addOrderItem() {
    let orderItem = new OrderItems();
    orderItem.item_name = this.searchItem;
    this.orderItems.push(orderItem);
    this.searchItem = '';
    this.searchDisabled = true;
  }

  async removeOrderItem(index: number, orderItem: OrderItems) {
    if (orderItem.id) {
      // this.orderService.deleteOrderItem(orderItem.id).subscribe(res => {
      //   this.orderItems.splice(index, 1);
      // });
    }
    this.orderItems.splice(index, 1);
  }

  checkValue() {
    console.log("this search item: ", this.searchItem);

    if (this.searchItem.length > 0) {
      this.searchDisabled = false;
    } else {
      this.searchDisabled = true;
    }
  }

  submitOrder() {
    // this.orderService.addOrder(this.orderItems).subscribe(res => {
    //   console.log("res: ", res);
    // });
  }

}
