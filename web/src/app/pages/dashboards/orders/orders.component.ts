import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DasboardServiceService } from '../dasboard-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private modalService: NgbModal, private dashboardService: DasboardServiceService) { }

  transactions: any[];
  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Orders', active: true }];

    // faker transaction
    this.transactions = this.dashboardService.transactions;
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
