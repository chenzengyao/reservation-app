import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from'../../../core/services/reservation';
import {MenusService} from "../../../core/services/menus.service";
import {AuthenticationService} from "../../../core/services/auth.service";
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss', 'tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private reservationService: ReservationService, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService, private httpClient: HttpClient,
              private route: ActivatedRoute, private router: Router) { }

  addReservationForm: FormGroup;
  pax_no: number;
  reservation_dt: String;
  reserve_status: String;
  reserve_remark: String;
  reserve_created_dt: String;
  userID: number;
  tableID: number;
  submitted = false;
  successmsg = false;
  error = '';
  working = false;
  status: String;
  table: number;

  ngOnInit(): void {

    //this one currently invalid, hardcode it first
    // this.current_user = this.authenticationService.currentUser()

    this.userID = 12345;
    this.table = 6789;
    this.status = "Pending"
    this.addReservationForm = this.formBuilder.group({
      pax_no: [''],
      reservation_dt: [''],
      reserve_status: [''],
      reserve_remark: [''],
      reserve_created_dt: [''],
      userID: [''],
      tableID: [''],
    });
  }

  get f() { return this.addReservationForm.controls; }

  onSubmit() {
    this.submitted = true;
    const current = new Date();
    var reserve_created_dt = current.getTime();
    this.addReservationForm.value.reserve_created_dt = reserve_created_dt;
    this.addReservationForm.value.reserve_status = this.status;
    this.addReservationForm.value.userID = this.userID;
    this.addReservationForm.value.tableID = this.table;
    console.log(this.addReservationForm.value.pax_no);
    console.log(this.addReservationForm.value.reserve_remark);
    console.log(this.addReservationForm.value.reservation_dt);
    console.log(this.addReservationForm.value.reserve_status);
    console.log(this.addReservationForm.value.reserve_created_dt);
    console.log(this.addReservationForm.value.userID);
    console.log(this.addReservationForm.value.tableID);

    // stop here if form is invalid
    if (this.addReservationForm.invalid) {
      console.log("Failed");
      return;
    } else {
      const formData = new FormData();
      formData.append('pax_no',this.addReservationForm.value.pax_no);
      formData.append('reserve_remark',this.addReservationForm.value.reserve_remark);
      formData.append('reservation_dt',this.addReservationForm.value.reservation_dt);
      formData.append('reserve_status',this.addReservationForm.value.reserve_status);
      formData.append('reserve_created_dt',this.addReservationForm.value.reserve_created_dt);
      formData.append('userID',this.addReservationForm.value.userID);
      formData.append('tableID',this.addReservationForm.value.tableID);

      this.reservationService.addReservation(formData).subscribe(res => {

      })

    }

    this.working = true;
    setTimeout(() => {
      this.addReservationForm.reset();
      this.working = false;
    }, 1000);
  }

}
