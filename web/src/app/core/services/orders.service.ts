import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";

@Injectable({ providedIn: "root" })
export class OrdersService {
  constructor(private http: HttpClient) { }

  orderTypeList: any[] = [
    { id: 1, name: "Reservation", value: "dine" },
    { id: 2, name: "Delivery", value: "delivery" },
  ]

  addOder(data: any) {
    return this.http.post(`${apiLink()}/user/addOrder`, data);
  }

  getOrder(email: string) {
    return this.http.get('/user/getOrder?email=' + email);
  }

  userOrderByID(orderID: number) {
    console.log("userOrderByID id: ", orderID);
    return this.http.get(`${apiLink()}/user/order/getOrderByID?orderID=` + orderID);
  }

}
