import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import {NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';

import { DefaultComponent } from './default/default.component';
import { UsersComponent } from './users/users.component';
import { MenusComponent } from './menus/menus.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AddMenusComponent } from './menus/add-menus/add-menus.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { AddOrdersComponent } from './orders/add-orders/add-orders.component';
import { AddDeliveryComponent } from './delivery/add-delivery/add-delivery.component';
import { TablesComponent } from './tables/tables.component';
import { AddTablesComponent } from './tables/add-tables/add-tables.component';
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { EditOrdersComponent } from './orders/edit-orders/edit-orders.component';
import { TableListingComponent } from './tables/table-listing/table-listing.component';

@NgModule({
  declarations: [DefaultComponent, UsersComponent, MenusComponent, OrdersComponent, DeliveryComponent, AddMenusComponent, AddUsersComponent, AddOrdersComponent, EditOrdersComponent, AddDeliveryComponent, TablesComponent, AddTablesComponent, TableListingComponent],
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
    SimplebarAngularModule,
    DropzoneModule,
    NgbAlertModule
  ]
})
export class DashboardsModule { }
