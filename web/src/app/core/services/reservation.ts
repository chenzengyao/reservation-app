import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";
import { getFirebaseBackend } from '../../authUtils';
import { Menu } from '../models/menu.models'
@Injectable({ providedIn: "root" })
export class ReservationService {
  constructor(private http: HttpClient) {}

  getAllReservation() {
    return this.http.get<any[]>(`${apiLink()}/api/reservation`, {
      observe: "response",
    });
  }

  add(pax_no: number, reservation_dt: String, reserve_status: String, reserve_remark: String,
      reserve_created_dt: String, userID: String, tableID: String)
  {
    return this.http.post(`/user/reservation/add?userID=` + userID + '&pax_no=' + pax_no + '&reservation_dt=' + reservation_dt +
      '&reserve_status=' + reserve_status + '&reserve_remark=' + reserve_remark + '&reserve_created_dt=' + reserve_created_dt +
      '&tableID=' + tableID,{ observe: 'response' });
  }
}
