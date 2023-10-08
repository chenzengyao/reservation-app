import { Component, OnInit } from '@angular/core';
import { MenusService } from "../../../core/services/menus.service";
import { Menu } from "../../../core/models/menu.models";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderItems} from "../../../core/models/orderItems.models";
import { Orders } from "src/app/core/models/orders.models";
import Swal from "sweetalert2";
import { OrdersService} from "../../../core/services/orders.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss', './menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private menusService: MenusService,
              private orderService: OrdersService,
              private router: Router) {
  }

  menu: Menu[] = [];
  selectedCategory: string="All";
  order: Orders = new Orders();
  orderItemsList: OrderItems[] = [];
  totalAmount=0;
  quantity: number[]=[]
  remark: String []=[];

  ngOnInit(): void {
    this.menusService.getAllMenuUser().subscribe(data =>{
      this.menu = data.body as Menu[];
    })
  }

  addToOrder(item: any, quantity: any, remark: any) {
    console.log("start add");
    console.log("quantity " + quantity);
    console.log("remark " + remark);
    let orderItem = new OrderItems();
    orderItem.item_id = item.itemID;
    orderItem.order_remark = remark;
    orderItem.order_quantity = quantity;
    orderItem.item_name = item.item_name;
    orderItem.item_price = item.item_price;
    orderItem.item_category = item.item_category;

    this.orderItemsList.push(orderItem);
    console.log("item in order list " + this.orderItemsList.length);
  }

  setTotalAmount(index) {
    this.orderItemsList[index]["total"] = parseFloat(this.orderItemsList[index].item_price) * this.orderItemsList[index].order_quantity;
    // summ all total
      this.totalAmount = 0;
      this.orderItemsList.forEach(item => {
        this.totalAmount += item['total'];
      });
  }

  async removeOrderItem(item: any, i: number) {
    const index = this.orderItemsList.indexOf(item.item_id);
    console.log("item.name "+ item.item_name)
    this.orderItemsList.splice(index, 1);
    console.log("after remove" + this.orderItemsList.length);

    // reset quantity and remark
    this.quantity[i]=0;
    this.remark[i] ='';

  }

  submitOrder() {
    console.log("this order: ", this.order, this.orderItemsList);

    let data = {}
    data['order'] = this.order;
    data['orderItemsList'] = this.orderItemsList;

    this.orderService.addOder(data).toPromise().then((res: any) => {
      console.log("res: ", res);
      // redirect to reservation list
      let timerInterval;
      Swal.fire({
        title: 'Success',
        html: 'Order added successfully! ',
        timer: 2000,
        icon: 'success',

        didOpen: () => {
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft() + ''
              }
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        // this.router.navigate(['/admin/orders/listing']);
      });
    }).catch((err: any) => {
      console.error("err: ", err);
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
