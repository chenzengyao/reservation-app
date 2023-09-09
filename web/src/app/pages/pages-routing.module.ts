import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { ComingSoonComponent } from "../extrapages/coming-soon/coming-soon.component";
import { UsersComponent } from "./dashboards/users/users.component";
import { MenusComponent } from "./dashboards/menus/menus.component";
import { OrdersComponent } from "./dashboards/orders/orders.component";
import { DeliveryComponent } from "./dashboards/delivery/delivery.component";

const routes: Routes = [
  // { path: '', redirectTo: 'admin/dashboard' },
  { path: "", component: ComingSoonComponent },
  { path: "dashboard", component: DefaultComponent },
  { path: "dashboard", loadChildren: () => import("./dashboards/dashboards.module").then((m) => m.DashboardsModule), },
  { path: "users/listing", component: UsersComponent },
  { path: "menus/listing", component: MenusComponent },
  { path: "orders/listing", component: OrdersComponent },
  { path: "delivery/listing", component: DeliveryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
