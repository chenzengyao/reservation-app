import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DeliveryService {
  constructor(private http: HttpClient) { }

  deliveryStatusList: any[] = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Completed" },
  ];

}
