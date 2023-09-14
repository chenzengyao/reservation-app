import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiLink } from "../helpers/helper";

@Injectable({ providedIn: "root" })
export class MenusService {
  constructor(private http: HttpClient) {}

  getAllMenus() {
    return this.http.get<any[]>(`${apiLink()}/api/menus`, {
      observe: "response",
    });
  }
}
