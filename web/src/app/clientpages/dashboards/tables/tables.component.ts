import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from'../../../core/services/reservation';
import {AuthenticationService} from "../../../core/services/auth.service";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";
import {User} from "../../../core/models/auth.models";
import { UserProfileService } from "../../../core/services/user.service";
import { Tables} from "../../../core/models/tables.models";
import { TablesService} from "../../../core/services/tables.service";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss', 'tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private reservationService: ReservationService, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService, private httpClient: HttpClient,
              private route: ActivatedRoute, private router: Router,
              private userService: UserProfileService,
              private tableService: TablesService) {
    this.setMinDate();
  }

  addReservationForm: FormGroup;
  pax_no: number;
  reservation_dt: String;
  reserve_status: String;
  reserve_remark: String;
  reserve_created_dt: String;
  userID: String;
  tableID: String;
  submitted = false;
  successmsg = false;
  error = '';
  working = false;
  status: String;
  table: String;
  minDate: string;
  selectedDate: string = '';
  isPastDate: boolean = false;
  currentUser: User;
  username: string;
  email: string;
  table_status: string = "Available";
  tablesList: Tables[] = [];
  table_temp: Tables[] =[];


  today= new Date();
  jstoday = '';

  ngOnInit(): void {
    //Check for login user
    if (sessionStorage.getItem('email')==null){
      window.location.href = '/account/login';
    } else{
      true;
    }
    this.userID = sessionStorage.getItem('userId');
    this.email = sessionStorage.getItem('email');
    console.log(this.userID);

    this.userService.getUserProfile(sessionStorage.getItem('email')).subscribe(data => {
      this.currentUser = data.body as User;
      this.username = this.currentUser.userName;
    });

    // this.tableService.adminGetTables().subscribe((res: any) => {
    //   console.log(res);
    //   this.tablesList = res;
    //   this.filterTablesByStatus(this.table_status);
    // });


    this.table = "1";
    this.status = "Pending"
    this.addReservationForm = this.formBuilder.group({
      pax_no: [''],
      reservation_dt: [''],
      reserve_status: [''],
      reserve_remark: [''],
      reserve_created_dt: [''],
      userID: [ ],
      tableID: [''],
      username: [''],
      email: [''],
    });
  }

  // filterTablesByStatus(table_status: string) {
  //   this.table_temp = this.tablesList.filter(table => table.table_status === status);
  //   console.log(this.table_temp);
  // }

  setMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().slice(0, 16);
  }

  checkDateValidity() {
    const selectedDateTime = new Date(this.selectedDate).getTime();
    const currentDateTime = new Date().getTime();
    this.isPastDate = selectedDateTime < currentDateTime;
  }


  get f() { return this.addReservationForm.controls; }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.addReservationForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        console.log(name);
      }
    }
    return invalid;
  }

  onSubmit() {
    this.submitted = true;
    this.checkDateValidity();
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+08:00');
    console.log(this.jstoday);
    this.addReservationForm.value.reserve_created_dt= this.jstoday;
    this.addReservationForm.value.reserve_status = this.status;
    this.addReservationForm.value.userID = this.userID;
    this.addReservationForm.value.tableID = this.table
    console.log(this.addReservationForm.value.pax_no);
    console.log(this.addReservationForm.value.reserve_remark);
    console.log(this.addReservationForm.value.reserve_status);
    console.log(this.addReservationForm.value.reserve_created_dt);
    console.log(this.addReservationForm.value.userID);
    console.log(this.addReservationForm.value.tableID);
    console.log(this.addReservationForm.value.reservation_dt);

    console.log(this.submitted, this.isPastDate);

    if(this.submitted === true && this.isPastDate === false) {
      console.log(this.submitted, this.isPastDate);

      // stop here if form is invalid
      if (this.addReservationForm.invalid) {
        console.log("Failed");
        console.log(this.findInvalidControls());
        return;
      } else {
        const formData = new FormData();
        formData.append('pax_no', this.addReservationForm.value.pax_no);
        formData.append('reserve_remark', this.addReservationForm.value.reserve_remark);
        formData.append('reservation_dt', this.addReservationForm.value.reservation_dt);
        formData.append('reserve_status', this.addReservationForm.value.reserve_status);
        formData.append('reserve_created_dt', this.addReservationForm.value.reservation_dt);
        formData.append('userID', this.addReservationForm.value.userID);
        formData.append('tableID', this.addReservationForm.value.tableID);
        formData.append('username', this.username);
        formData.append('email', this.email);

        this.reservationService.addReservation(formData).subscribe(res => {

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
        })
      }

      this.working = true;
      setTimeout(() => {
        this.addReservationForm.reset();
        this.working = false;
      }, 1000);
    }
    else {
      console.log("Invalid");
    }
  }
}
