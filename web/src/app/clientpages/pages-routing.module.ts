import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { ClientComponent } from "../extrapages/client/client.component";
import { UsersComponent } from "./dashboards/users/users.component";
import { MenusComponent } from "./dashboards/menus/menus.component";
import { OrdersComponent } from "./dashboards/orders/orders.component";
import { DeliveryComponent } from "./dashboards/delivery/delivery.component";

const routes: Routes = [
  // { path: '', redirectTo: 'admin/dashboard' },
  { path: "", component: ClientComponent },
  { path: "dashboard", component: DefaultComponent },
  { path: "dashboard", loadChildren: () => import("./dashboards/dashboards.module").then((m) => m.DashboardsModule), },
  { path: "user/profile", component: UsersComponent },
  { path: "menu", component: MenusComponent },
  { path: "orders", component: OrdersComponent },
  { path: "delivery", component: DeliveryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
