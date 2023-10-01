import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {

  constructor() { }

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Add Delivery', active: true }];
  }

  submitDelivery() {
    console.log("submit delivery");
  }

}
