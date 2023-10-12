import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DasboardServiceService } from '../dasboard-service.service';
import { ReservationService } from 'src/app/core/services/reservation';
import { Reservation } from 'src/app/core/models/reservation.models';
import { Orders } from 'src/app/core/models/orders.models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private reservationService: ReservationService) { }

  breadCrumbItems: Array<{}>;
  reservationList: Reservation[] = [];
  ordersList: Orders[] = [];
  reservationModal: any = {};

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Orders', active: true }];

    this.reservationService.getAllReservation().toPromise().then((res: any) => {
      console.log("this reservation list: ", res);
      this.ordersList = res.reservation;
    }).catch((err: any) => { });
  }

  openModal(content: any, reservation: any) {
    this.reservationModal = reservation;
    let totalAmount = 0;
    this.reservationModal.orderItemList.forEach((item: any) => {
      totalAmount += (item.item_price * item.order_quantity);
    });
    this.reservationModal.total_amount = totalAmount;
    console.log("this reservation: ", this.reservationModal);
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

}
