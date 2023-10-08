import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";
import { getFirebaseBackend } from '../../authUtils';
import { Menu } from '../models/menu.models'
@Injectable({ providedIn: "root" })
export class ReservationService {
  constructor(private http: HttpClient) { }

  getAllReservation() {
    return this.http.post<any[]>(`${apiLink()}/admin/reservation/all`, { observe: "response" });
  }

  add(pax_no: number, reservation_dt: String, reserve_status: String, reserve_remark: String,
    reserve_created_dt: String, userID: String, tableID: String) {
    return this.http.post(`/user/reservation/add?userID=` + userID + '&pax_no=' + pax_no + '&reservation_dt=' + reservation_dt +
      '&reserve_status=' + reserve_status + '&reserve_remark=' + reserve_remark + '&reserve_created_dt=' + reserve_created_dt +
      '&tableID=' + tableID, { observe: 'response' });
  }

  adminAddReservation(data: any) {
    return this.http.post(`${apiLink()}/admin/reservation/addReservation`, data);
  }

  adminGetReservationByID(reservationID: number) {
    console.log("adminGetReservationByID id: ", reservationID);
    return this.http.get(`${apiLink()}/admin/reservation/getReservationByID?reservationID=` + reservationID);
  }

  adminUpdateReservation(data: any) {
    console.log("adminUpdateReservation data: ", data);
    return this.http.post(`${apiLink()}/admin/reservation/updateReservation`, data);
  }

  addReservation(data: any) {
    return this.http.post(`${apiLink()}/user/reservation/addReservation`, data);
  }
}
