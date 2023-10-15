import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder,AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Payment} from "../../../core/models/payment.models";
import { dataService } from "../../../dataService";
import { OrdersService } from "../../../core/services/orders.service";
import { OrderItems} from "../../../core/models/orderItems.models"
import { Orders } from "../../../core/models/orders.models"
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from "../../../core/services/payment.service";
import {formatDate} from "@angular/common";

import Swal from "sweetalert2";
import {Tables} from "../../../core/models/tables.models";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', './payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private dataService: dataService,
              private orderService: OrdersService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private paymentService: PaymentService,) { }

  email: string;
  ViewDetails: boolean[] = [];
  visible: boolean[] = [];

  paymentForm : FormGroup
  payment: Payment = new Payment();
  expirationDate: number;
  cardnumber: number;
  ccv: number;
  name: string;
  status: string = "Pending";

  submitted: boolean =true;
  breadCrumbItems: Array<{}>;
  orderID: number = 0;
  order: Orders = new Orders();
  orderItemsList: OrderItems[] = [];
  totalAmount: number = 0;
  total: number=0;
  gst: number = 1.08;
  serviceTax: number = 1.10;
  discount_coupun: string = "no";
  userID: string;

  ngOnInit(): void {
    //Check for login user
    if (sessionStorage.getItem('email')==null){
      window.location.href = '/account/login';
    } else{
      true;
    }
    this.userID = sessionStorage.getItem('userId');

    this.breadCrumbItems = [{ label: "Order" }, { label: "Add Orders", active: true },];

    // route get order ID
    this.activeRoute.params.subscribe(params => {
      this.orderID = params['orderID'];
      console.log("this order id: ", this.orderID);
      if (this.orderID == null) {
        this.router.navigate(["/user/menu"]);
      }
    });

    //Get order item
    this.orderService.userOrderByID(this.orderID).toPromise().then((res: any) => {
      if (res == null) {
        this.router.navigate(["/user/dashboard"]);
      }
      console.log("res: ", res);
      this.order = res;

      this.orderItemsList = res.orderItemList;
      this.orderItemsList.forEach(item => {
        item['total'] = parseFloat(item.item_price) * item.order_quantity;
        this.totalAmount += (parseFloat(item.item_price) * item.order_quantity);
      });
    }).catch((err: any) => {
      console.error("err: ", err);
    });

    // Payment form validation
    this.paymentForm = this.formBuilder.group({
      expirationDate: ['', [
          Validators.required,
          this.creditCardExpiryValidator() // MM/YY format
        ]],
      cardnumber: ['', [
          Validators.required,
          Validators.pattern('[0-9]{12}'),
          Validators.maxLength(12)
        ]],
      ccv: ['', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
          Validators.maxLength(3)
      ]],
      name: ["", [
          Validators.required
      ]]

    });
  }

  get f() { return this.paymentForm.controls; }

  creditCardExpiryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
        return { invalidCreditCardExpiry: true };
      }
      return null;
    };
  }

  ClearCardDetails(){
    this.paymentForm.reset();
  }

  calculateTotal(){
    this.total = this.totalAmount * this.gst * this.serviceTax;
    const total = this.total.toFixed(2);
    return total;
  }

  onSubmit() {
    this.submitted = true;
    this.payment.sub_total_price = this.totalAmount.toFixed(2).toString();
    this.payment.total_price = this.calculateTotal();
    this.payment.payment_type = "Credit Card";
    this.payment.gst = "1.08";
    this.payment.service_tax = "1.10";
    this.payment.orderID = this.orderID;
    this.payment.discount_coupun = this.discount_coupun;
    // need update
    this.payment.userID = parseFloat(this.userID);

    console.log("this payment: ", this.payment);


    let data = {}
    data['payment'] = this.payment;
    data['order'] = this.order;

    // stop here if form is invalid
    if (this.paymentForm.invalid) {
      console.log("Failed to upload");
      return;
    } else {
      this.paymentService.addPayment(data).toPromise().then((res: any) => {
        console.log("res: ", res);
        // redirect to reservation list
        let timerInterval;
        Swal.fire({
          title: 'Success',
          html: 'Payment made successfully! ',
          timer: 2000,
          icon: 'success',

          didOpen: () => {
            timerInterval = setInterval(() => {
              const content = Swal.getHtmlContainer()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft() + ''
                }
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          this.router.navigate(['/user/dashboard']);
        });
      }).catch((err: any) => {
        console.error("err: ", err);
      });
    }

  }

}

