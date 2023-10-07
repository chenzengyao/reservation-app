import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { ClientComponent } from "../extrapages/client/client.component";
import { UsersComponent } from "./dashboards/users/users.component";
import { MenusComponent } from "./dashboards/menus/menus.component";
import { OrdersComponent } from "./dashboards/orders/orders.component";
// import { TablesComponent } from "./dashboards/tables/tables.component";
import { DeliveryComponent } from "./dashboards/delivery/delivery.component";
import { SettingsComponent } from "./dashboards/settings/settings.component";
import { TablesComponent } from "../clientpages/dashboards/tables/tables.component";
const routes: Routes = [
  // { path: '', redirectTo: 'admin/dashboard' },
  { path: "", component: ClientComponent },
  { path: "dashboard", component: DefaultComponent },
  { path: "dashboard", loadChildren: () => import("./dashboards/dashboards.module").then((m) => m.DashboardsModule), },
  { path: "profile", component: UsersComponent },
  { path: "orderhistory", component: OrdersComponent },
  { path: "menu", component: MenusComponent },
  { path: "tables", component: TablesComponent },
  { path: "delivery", component: DeliveryComponent },
  { path: "settings", component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
