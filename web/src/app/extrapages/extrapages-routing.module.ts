import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Page404Component } from "./page404/page404.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";

const routes: Routes = [
  { path: "404", component: Page404Component },
  { path: "", component: ComingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrapagesRoutingModule {}
