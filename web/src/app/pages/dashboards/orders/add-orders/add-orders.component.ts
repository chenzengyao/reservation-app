import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeliveryMan } from "src/app/core/models/delivery-man.models";
import { Delivery } from "src/app/core/models/delivery.models";
import { Menu } from "src/app/core/models/menu.models";
import { OrderItems } from "src/app/core/models/orderItems.models";
import { Orders } from "src/app/core/models/orders.models";
import { Reservation } from "src/app/core/models/reservation.models";
import { DeliveryService } from "src/app/core/services/delivery.service";
import { DeliveryManService } from "src/app/core/services/deliveryman.service";
import { MenusService } from "src/app/core/services/menus.service";
import { OrdersService } from "src/app/core/services/orders.service";
import { ReservationService } from "src/app/core/services/reservation";
import { TablesService } from "src/app/core/services/tables.service";
import { UserProfileService } from "src/app/core/services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-add-orders",
  templateUrl: "./add-orders.component.html",
  styleUrls: ["./add-orders.component.scss"],
})
export class AddOrdersComponent implements OnInit {
  constructor(private menuService: MenusService,
    private reservationService: ReservationService,
    private router: Router,
    public orderService: OrdersService,
    public deliveryService: DeliveryService,
    public userService: UserProfileService,
    public tableService: TablesService,
    public deliveryManService: DeliveryManService,
    private modalService: NgbModal) { }

  breadCrumbItems: Array<{}>;
  searchItem: string = "";
  searchDisabled: boolean = true;
  totalAmount: number = 0;
  reservation: Reservation = new Reservation();
  order: Orders = new Orders();
  orderItemsList: OrderItems[] = [];
  delivery: Delivery = new Delivery();
  menuList: Menu[] = [];
  tableList: any[] = [];
  userList: any[] = [];
  deliveryManList: any[] = [];
  deliveryMan: DeliveryMan = new DeliveryMan();

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Reservation" }, { label: "Add Orders", active: true },];

    this.menuService.getAllMenu().toPromise().then((res: any) => {
      console.log("this menu list: ", res.body);
      this.menuList = res.body;
    }).catch((err: any) => {
      console.log("err: ", err);
    });

    this.tableService.adminGetTables().toPromise().then((res: any) => {
      console.log("this table list: ", res);
      this.tableList = res;
    }).catch((err: any) => { });

    this.deliveryManService.adminGetAllDeliveryMan().toPromise().then((res: any) => {
      console.log("deliveryman list: ", res);
      this.deliveryManList = res;
    }).catch((err: any) => { });
  }

  addOrderItem() {
    let orderItem = new OrderItems();
    let menu = new Menu();
    menu = this.menuList.filter((item) => item.item_name == this.searchItem)[0];
    if (menu != null) {
      orderItem.item_id = menu.itemID;
      orderItem.item_name = menu.item_name;
      orderItem.item_price = menu.item_price;
      orderItem.item_category = menu.item_category;
    }

    this.orderItemsList.push(orderItem);
    this.searchItem = "";
    this.searchDisabled = true;
  }

  async removeOrderItem(index: number, orderItem: OrderItems) {
    if (orderItem.id) {
      // this.orderService.deleteOrderItem(orderItem.id).subscribe(res => {
      //   this.orderItems.splice(index, 1);
      // });
    }
    this.orderItemsList.splice(index, 1);
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
    if (this.reservation.tableID) {
      this.reservation.tableID = parseInt(this.reservation.tableID.toString());
    }
    let data = {}
    data['reservation'] = this.reservation;
    data['order'] = this.order;
    data['orderItemsList'] = this.orderItemsList;
    data['delivery'] = this.delivery;
    console.log("this data: ", data);

    this.reservationService.adminAddReservation(data).toPromise().then((res: any) => {
      console.log("res: ", res);
      // redirect to reservation list
      let timerInterval;
      Swal.fire({
        title: 'Success',
        html: 'Reservation added successfully! ',
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
        this.router.navigate(['/admin/orders/listing']);
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

  searchUserName(name: string) {
    console.log("this name: ", name);
    if (name.length > 2) {
      this.userService.getUserByName(name).toPromise().then((res: any) => {
        console.log("this user: ", res);
        this.userList = res.body;
      }).catch((err: any) => { });
    } else {
      this.userList = [];
    }
  }

  selectUser(user: any) {
    console.log("this user: ", user);
    this.order.userID = user.userID;
    this.userList = [];
  }
}
