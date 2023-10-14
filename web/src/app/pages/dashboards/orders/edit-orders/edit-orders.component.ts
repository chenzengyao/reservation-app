import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dateStringToDateLocal } from 'src/app/core/helpers/helper';
import { Delivery } from 'src/app/core/models/delivery.models';
import { Menu } from 'src/app/core/models/menu.models';
import { OrderItems } from 'src/app/core/models/orderItems.models';
import { Orders } from 'src/app/core/models/orders.models';
import { Reservation } from 'src/app/core/models/reservation.models';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { MenusService } from 'src/app/core/services/menus.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ReservationService } from 'src/app/core/services/reservation';
import { TablesService } from 'src/app/core/services/tables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss']
})
export class EditOrdersComponent implements OnInit {

  constructor(private menuService: MenusService,
    public reservationService: ReservationService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public orderService: OrdersService,
    public deliveryService: DeliveryService,
    public tableService: TablesService) { }

  breadCrumbItems: Array<{}>;
  searchItem: string = "";
  searchDisabled: boolean = true;
  totalAmount: number = 0;
  reservation: Reservation = new Reservation();
  order: Orders = new Orders();
  orderItemsList: OrderItems[] = [];
  menuList: Menu[] = [];
  tableList: any[] = [];
  reservationID: number = 0;
  userName: string = "";
  delivery: Delivery = new Delivery();


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Reservation" }, { label: "Add Orders", active: true },];

    this.activeRoute.params.subscribe(params => {
      this.reservationID = params['reservationID'];
      console.log("this reservation id: ", this.reservationID);
      if (this.reservationID == null) {
        this.router.navigate(["/admin/orders/listing"]);
      }
    });

    this.reservationService.adminGetReservationByID(this.reservationID).toPromise().then((res: any) => {
      if (res == null) {
        this.router.navigate(["/admin/orders/listing"]);
      }
      console.log("res: ", res);
      this.order = res;
      if (res.reservation) {
        this.reservation = res.reservation
        this.reservation.reservation_dt = dateStringToDateLocal(res.reservation.reservation_dt);
      }
      if (res.delivery) {
        this.delivery = res.delivery;
        this.delivery.delivery_start_dt = dateStringToDateLocal(res.delivery.delivery_start_dt);
        this.delivery.delivery_completed_dt = dateStringToDateLocal(res.delivery.delivery_completed_dt);
      }
      this.userName = res.user.userName;
      this.orderItemsList = res.orderItemList;
      this.orderItemsList.forEach(item => {
        item['total'] = parseFloat(item.item_price) * item.order_quantity;
        this.totalAmount += (parseFloat(item.item_price) * item.order_quantity);
      });
    }).catch((err: any) => {
      console.error("err: ", err);
      // this.router.navigate(["/admin/orders/listing"]);
    });

    this.menuService.getAllMenu().toPromise().then((res: any) => {
      console.log("this menu list: ", res.body);
      this.menuList = res.body;
    }).catch((err: any) => {
      console.log("err: ", err);
    });

    this.tableService.adminGetTables().toPromise().then((res: any) => {
      console.log("this table list: ", res);
      this.tableList = res;
    }).catch((err: any) => {});
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
    console.log("this order: ", this.reservation, this.order, this.orderItemsList, this.delivery);
    if (this.reservation) {
      this.reservation.tableID = parseInt(this.reservation.tableID.toString());
    }
    let data = {}
    data['reservation'] = this.reservation;
    data['order'] = this.order;
    data['orderItemsList'] = this.orderItemsList;
    data['delivery'] = this.delivery;

    this.reservationService.adminUpdateReservation(data).toPromise().then((res: any) => {
      console.log("res: ", res);
      Swal.fire({
        title: 'Success!',
        text: 'Order update successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/admin/orders/listing"]);
        }
      });
    }).catch((err: any) => {
      console.log("err: ", err);
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

}
