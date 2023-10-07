import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";
import { getFirebaseBackend } from '../../authUtils';
import { Menu } from '../models/menu.models'

@Injectable({ providedIn: "root" })
export class MenusService {
  constructor(private http: HttpClient) {}

  getAllMenu() {
    return this.http.get('/admin/getAllMenu', {observe: 'response',});
  }

  add(item_category: String, item_name: String, item_description: String, item_price: String,
      item_remark: String, item_status: String, item_created_dt: String, created_by: String
  ) {
    return this.http.post(`/admin/menu/add?item_name=` + item_name + '&item_category=' + item_category + '&item_description=' + item_description + '&item_price=' + item_price +
    '&item_remark=' + item_remark + '&item_status=' + item_status + '&item_created_dt=' + item_created_dt +
    '&created_by=' + created_by ,{ observe: 'response' });
  }

  addMenu(formData: FormData) {
    return this.http.post('/admin/menu/addMenu', formData);
  }


}
