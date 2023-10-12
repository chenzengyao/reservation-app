import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";
import { getFirebaseBackend } from '../../authUtils';
import { Menu } from '../models/menu.models'

@Injectable({ providedIn: "root" })
export class MenusService {
  constructor(private http: HttpClient) {}

  getAllMenu() {
    return this.http.get(apiLink() + '/admin/getAllMenu', {observe: 'response',});
  }

  getAllMenuUser() {
    return this.http.get('/user/getAllMenu', {observe: 'response',});
  }

  add(item_category: String, item_name: String, item_description: String, item_price: String,
      item_remark: String, item_status: String, item_created_dt: String, created_by: String
  ) {
    return this.http.post(`/admin/menu/add?item_name=` + item_name + '&item_category=' + item_category + '&item_description=' + item_description + '&item_price=' + item_price +
    '&item_remark=' + item_remark + '&item_status=' + item_status + '&item_created_dt=' + item_created_dt +
    '&created_by=' + created_by ,{ observe: 'response' });
  }

  addMenu(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(apiLink() + '/admin/menu/addMenu', formData, { headers: headers });
  }

  modifyMenu(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(apiLink() + '/admin/menu/modifyMenu', formData, { headers: headers });
  }

  getImage(itemID: number) {
    return this.http.get('/user/menu/getImage?itemID='+ itemID, { observe: 'response' });
  }

}
