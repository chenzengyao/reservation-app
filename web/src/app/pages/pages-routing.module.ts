import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { ClientComponent } from "../extrapages/client/client.component";
import { UsersComponent } from "./dashboards/users/users.component";
import { MenusComponent } from "./dashboards/menus/menus.component";
import { OrdersComponent } from "./dashboards/orders/orders.component";
import { DeliveryComponent } from "./dashboards/delivery/delivery.component";
import { AddMenusComponent } from "./dashboards/menus/add-menus/add-menus.component";
import { AddOrdersComponent } from "./dashboards/orders/add-orders/add-orders.component";
import { AddDeliveryComponent } from "./dashboards/delivery/add-delivery/add-delivery.component";
import { AddUsersComponent } from "./dashboards/users/add-users/add-users.component";
import { TablesComponent } from "./dashboards/tables/tables.component";
import { AddTablesComponent } from "./dashboards/tables/add-tables/add-tables.component";
import { EditOrdersComponent } from "./dashboards/orders/edit-orders/edit-orders.component";


const routes: Routes = [
  // { path: '', redirectTo: 'admin/dashboard' },
  { path: "", component: ClientComponent },
  { path: "dashboard", component: DefaultComponent },
  { path: "dashboard", loadChildren: () => import("./dashboards/dashboards.module").then((m) => m.DashboardsModule), },
  { path: "users/listing", component: UsersComponent },
  { path: "users/add", component: AddUsersComponent },
  { path: "menus/listing", component: MenusComponent },
  { path: "menus/add", component: AddMenusComponent },
  { path: "orders/listing", component: OrdersComponent },
  { path: "orders/add", component: AddOrdersComponent },
  { path: "orders/edit/:reservationID", component: EditOrdersComponent },
  { path: "delivery/listing", component: DeliveryComponent },
  { path: "delivery/add", component: AddDeliveryComponent },
  { path: "tables/listing", component: TablesComponent },
  { path: "tables/add", component: AddTablesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
