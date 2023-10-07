import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Menu} from "../../../core/models/menu.models";
import {User} from "../../../core/models/auth.models";
import { dataService } from "../../../dataService";


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']

})
export class UserprofileComponent implements OnInit {

  userprofileForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  working = false;
  minDate:String;
  maxDate:String;
  // name :'dobdate';
  strongPassword = false;
  dobdate;
  phone_no;
  address;
  show1: boolean = false;
  show2: boolean = false;
  userProfile: User;

  transform(value: string) {
       var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'dd/MM/yyyy');
        return value;
    }

  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService, private dataService: dataService) {
  }


  ngOnInit() {
    const today = new Date();
    this.minDate = new Date(this.year - 100, 0, 1).toISOString().split('T')[0];
    this.maxDate = new Date(this.year - 12, 0, 1).toISOString().split('T')[0];
    this.userprofileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phone_no: ['', Validators.required],
      address: []
    });

    // this.authenticationService.getUserDetails(email).subscribe(data =>{
    //
    // })


    this.dataService.setCurrentEmail("liz@gmail.com");
    console.log("this.dataService.getCurrentEmail()",this.dataService.getCurrentEmail());
    this.userService.getUserProfile(this.dataService.getCurrentEmail()).subscribe(data => {
      console.log(data);
      this.userProfile = data.body as User;
    })
  }



  // convenience getter for easy access to form fields
  get f() { return this.userprofileForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.userprofileForm.invalid) {
      return;
    } else {


    }

    this.working = true;
    setTimeout(() => {
      // this.userprofileForm.reset();
      this.working = false;
    }, 1000);
  }
}
