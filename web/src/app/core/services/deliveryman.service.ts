import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiLink } from '../helpers/helper';

@Injectable({ providedIn: 'root' })
export class DeliveryManService {
    constructor(private http: HttpClient) { }

    adminGetAllDeliveryMan() {
        return this.http.get(`${apiLink()}/admin/deliveryMan/all`);
    }

    adminSaveDeliveryMan(deliveryMan: any) {
        return this.http.post(`${apiLink()}/admin/deliveryMan/add`, deliveryMan);
    }
}