import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {apiLink} from "../helpers/helper";

@Injectable({ providedIn: "root" })
export class OrdersService {
  constructor(private http: HttpClient) {}

  addOder(data: any) {
    return this.http.post(`${apiLink()}/user/addOrder`, data);
  }

  getOrder(email: string) {
    return this.http.get('/user/getOrder?email=' + email);
  }

}
