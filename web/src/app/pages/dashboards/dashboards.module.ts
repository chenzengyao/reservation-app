import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';

import { DefaultComponent } from './default/default.component';
import { UsersComponent } from './users/users.component';
import { MenusComponent } from './menus/menus.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliveryComponent } from './delivery/delivery.component';

@NgModule({
  declarations: [DefaultComponent, UsersComponent, MenusComponent, OrdersComponent, DeliveryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    WidgetModule,
    NgApexchartsModule,
    SimplebarAngularModule
  ]
})
export class DashboardsModule { }
