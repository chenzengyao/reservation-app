import { Component, OnInit } from '@angular/core';
import { MenusService } from "../../../core/services/menus.service";
import { Menu } from "../../../core/models/menu.models";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderItems} from "../../../core/models/orderItems.models";
import { Orders } from "src/app/core/models/orders.models";
import { Delivery } from "src/app/core/models/delivery.models"
import Swal from "sweetalert2";
import { OrdersService} from "../../../core/services/orders.service";
import { Router } from "@angular/router";
import {SafeUrl} from "@angular/platform-browser";
import {DomSanitizer} from '@angular/platform-browser';
import { TablesService } from "../../../core/services/tables.service";
import {Tables} from "../../../core/models/tables.models";
import {User} from "../../../core/models/auth.models";
import { UserProfileService} from "../../../core/services/user.service";
import {Validators} from "@angular/forms";
import { getSafeImagePath } from 'src/app/core/helpers/helper';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss', './menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private menusService: MenusService,
              private orderService: OrdersService,
              private router: Router,
              private sanitizer: DomSanitizer,
              private tableService: TablesService,
              private userService: UserProfileService) {
  }

  menu: Menu[] = [];
  table: Tables[] = [];
  table_temp: Tables[] =[];
  selectedCategory: string="All";
  order: Orders = new Orders();
  delivery: Delivery = new Delivery();
  orderItemsList: OrderItems[] = [];
  totalAmount=0;
  quantity: number[]=[]
  remark: String []=[];
  status: string = "Available";

  imagePath: any =[];
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;

  selectedServiceType: string = 'dine'; // Default to 'Dine In'
  selectedTableNumber: string = 'table1'; // Default table number
  tablesList: Tables[] = [];
  returnOrder: Orders = new Orders();
  orderID: number;
  email: string;
  currentUser: User;
  userID: string;
  index: number=0;
  address: string;
  username: string;

  table_ID: number =null;
  delivery_ID: number =null;

  ngOnInit(): void {
    //Check for login user
    if (sessionStorage.getItem('email')==null){
      window.location.href = '/account/login';
    } else{
      true;
    }
    this.userID = sessionStorage.getItem('userId');

    this.userService.getUserProfile(sessionStorage.getItem('email')).subscribe(data => {
      this.currentUser = data.body as User;
      this.address = this.currentUser.address;
      this.username = this.currentUser.userName;
    });
    console.log("this userID: "+ this.userID)
    console.log("this address: "+ this.address)

    this.menusService.getAllMenuUser().subscribe(data =>{
      this.menu = data.body as Menu[];
      this.menu.forEach((element: Menu) => {
        this.imagePath[this.index] = getSafeImagePath(element.item_image);
        this.index++;
        console.log(this.index);
        console.log("img path: "+ this.imagePath[this.index]);
      });
    })

    this.tableService.adminGetTables().subscribe((res: any) => {
      console.log(res);
      this.tablesList = res;
      this.filterTablesByStatus(this.status);
    });
    console.log(this.tablesList)


    this.imagePath = this.getSafeImagePath(this.imagePath);
    console.log(this.imagePath);
  }

  filterTablesByStatus(status: string) {
    this.table_temp = this.tablesList.filter(table => table.table_status === status);
    console.log(this.table_temp);
  }

  addToOrder(item: any, quantity: any, remark: any, i: any) {
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

    // reset quantity and remark
    this.quantity[i]=null;
    this.remark[i] ='';
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
    // const index = this.orderItemsList.indexOf(item.item_id);
    // console.log("item.name "+ item.item_name)
    this.orderItemsList.splice(i, 1);


    console.log("after remove" + this.orderItemsList.length);
  }

  onServiceTypeChange() {
    // You can add logic here if needed when the service type changes
  }


  submitOrder() {
    this.order.order_type = this.selectedServiceType;
    console.log(this.selectedServiceType, this.order.order_type);

    if(this.selectedServiceType == 'dine'){
      this.order.table_id = parseFloat(this.selectedTableNumber);;
      console.log("this.order.table_id: "+this.order.table_id)
    }
    this.order.userID = parseFloat(this.userID);
    console.log("this.userID "+this.userID);
    console.log("this.order.userID "+this.order.userID);

    this.order.delivery_address = this.address;
    console.log("order address: "+ this.order.delivery_address);

    this.order.updated_by = this.username;
    console.log("updated by: "+ this.order.updated_by);

    let data = {}
    data['order'] = this.order;
    data['orderItemsList'] = this.orderItemsList;
    data['selectedServiceType'] = this.selectedServiceType;

    this.orderService.addOder(data).toPromise().then((res: any) => {
      console.log("res: ", res);
      this.returnOrder = res;
      this.orderID = this.returnOrder.orderID;
      console.log("Order ID: " + this.orderID);
      this.router.navigate(['/user/orders/orderDetail', this.orderID]);


    }).catch((err: any) => {
      console.error("err: ", err);
    });
  }

    getSafeImagePath(path: any): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(path);
    }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
