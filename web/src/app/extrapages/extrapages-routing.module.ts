import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./page404/page404.component";
import { ClientComponent } from "./client/client.component";

const routes: Routes = [
  { path: "404", component: Page404Component },
  { path: "", component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrapagesRoutingModule {}
