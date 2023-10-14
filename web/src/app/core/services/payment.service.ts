import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";
import { getFirebaseBackend } from '../../authUtils';


@Injectable({ providedIn: "root" })
export class PaymentService {
  constructor(private http: HttpClient) {}

  addPayment(data: any) {
    return this.http.post(`${apiLink()}/user/addOrder/payment`, data);
  }



}
