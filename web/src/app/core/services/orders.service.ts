import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";

@Injectable({ providedIn: "root" })
export class OrdersService {
  constructor(private http: HttpClient) { }

  orderTypeList: any[] = [
    { id: 1, name: "Reservation" },
    { id: 2, name: "Delivery" },
  ]

  addOder(data: any) {
    return this.http.post(`${apiLink()}/user/addOrder`, data);
  }
}
