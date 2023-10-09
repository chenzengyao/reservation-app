import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', './orders.component.css']
})
export class OrdersComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

  ViewDetails :boolean = true
  visible:boolean = false

  onClick(){
    this.ViewDetails = !this.ViewDetails
    this.visible = !this.visible
  }

}
