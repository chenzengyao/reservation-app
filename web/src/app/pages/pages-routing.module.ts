import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { ComingSoonComponent } from "../extrapages/coming-soon/coming-soon.component";

const routes: Routes = [
  // { path: '', redirectTo: 'admin/dashboard' },
  { path: "", component: ComingSoonComponent },
  { path: "dashboard", component: DefaultComponent },
  { path: "dashboard", loadChildren: () => import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
