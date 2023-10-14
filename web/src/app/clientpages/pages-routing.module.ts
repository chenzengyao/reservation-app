import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { ClientComponent } from "../extrapages/client/client.component";
import { UsersComponent } from "./dashboards/users/users.component";
import { ChangePasswordComponent } from "./dashboards/changePassword/changePassword.component";
import { MenusComponent } from "./dashboards/menus/menus.component";
import { OrdersComponent } from "./dashboards/orders/orders.component";
import { DeliveryComponent } from "./dashboards/delivery/delivery.component";
import { SettingsComponent } from "./dashboards/settings/settings.component";
import { TablesComponent } from "../clientpages/dashboards/tables/tables.component";
import { PaymentComponent } from "../clientpages/dashboards/payment/payment.component";
import { OrderDetailsComponent } from "./dashboards/order-details/order-details.component";

const routes: Routes = [
  // { path: '', redirectTo: 'admin/dashboard' },
  { path: "", component: ClientComponent },
  { path: "dashboard", component: DefaultComponent },
  { path: "dashboard", loadChildren: () => import("./dashboards/dashboards.module").then((m) => m.DashboardsModule), },
  { path: "profile", component: UsersComponent },
  { path: "changepassword", component: ChangePasswordComponent },
  { path: "orderhistory", component: OrdersComponent },
  { path: "menu", component: MenusComponent },
  { path: "tables", component: TablesComponent },
  { path: "delivery", component: DeliveryComponent },
  { path: "settings", component: SettingsComponent },
  { path: "orders/payment/:orderID", component: PaymentComponent },
  { path: "orders/orderDetail/:orderID", component: OrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
