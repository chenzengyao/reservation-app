import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";

@Injectable({ providedIn: "root" })
export class TablesService {
    constructor(private http: HttpClient) { }

    tableStatus: any = [
        { id: 1, status: "Available" },
        { id: 2, status: "Reserved" },
        { id: 3, status: "Occupied" },
        { id: 4, status: "Not Available" },
    ];

    adminGetTables() {
        return this.http.get(`${apiLink()}/admin/table/all`);
    }

    adminAddTables(data: any) {
        return this.http.post(`${apiLink()}/admin/table/addTable`, data);
    }

    adminUpdateTablesPosition(data: any) {
        return this.http.post(`${apiLink()}/admin/table/updateTablePosition`, data);
    }
}