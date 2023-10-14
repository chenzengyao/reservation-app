import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryMan } from 'src/app/core/models/delivery-man.models';
import { DeliveryManService } from 'src/app/core/services/deliveryman.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  constructor(private modalService: NgbModal, public deliveryManService: DeliveryManService) { }

  transactions: any[]

  breadCrumbItems: Array<{}>;

  deliveryMan: DeliveryMan = new DeliveryMan();
  deliveryManList: DeliveryMan[] = [];

  ngOnInit(): void {
    
    //Check for login user
    if (sessionStorage.getItem('email')==null){
      window.location.href = '/account/login';
    } else{
      true;
    }

    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Delivery', active: true }];
    this.deliveryManService.adminGetAllDeliveryMan().toPromise().then((res: any) => {
      console.log(res)
      this.deliveryManList = res;
    }).catch((err: any) => { });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  submit() {
    this.deliveryManService.adminSaveDeliveryMan(this.deliveryMan.deliveryman_phone_no).toPromise().then((res: any) => { 
      console.log("res: ", res);
      this.deliveryManList = res;
    }).catch((err: any) => { });
  }
}
