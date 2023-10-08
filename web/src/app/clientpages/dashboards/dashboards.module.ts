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
import { TablesComponent } from './tables/tables.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { SettingsComponent } from './settings/settings.component';
import {ChangePasswordComponent} from "./changePassword/changePassword.component";


@NgModule({
  declarations: [DefaultComponent, UsersComponent, MenusComponent, TablesComponent, OrdersComponent, DeliveryComponent, SettingsComponent, ChangePasswordComponent],
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
        NgbAlertModule
    ]
})
export class DashboardsModule { }
