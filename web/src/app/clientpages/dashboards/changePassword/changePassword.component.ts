import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { UserProfileService } from '../../../core/services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Menu} from "../../../core/models/menu.models";
import {User} from "../../../core/models/auth.models";
import { dataService } from "../../../dataService";

@Component({
  selector: 'app-users',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss', 'changePassword.component.css']
})

export class ChangePasswordComponent implements OnInit {

  userprofileForm: FormGroup;
  submitted = false;
  error = false;
  successmsg = false;
  working = false;
  minDate:String;
  maxDate:String;
  userName;
  email;
  dobdate;
  phone_no;
  address;
  show1: boolean = false;
  show2: boolean = false;
  userProfile: User;
  update: boolean = false;

  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }

  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
              private userService: UserProfileService, private dataService: dataService, private fb: FormBuilder) {
  }


  async ngOnInit() {
    await this.dataService.setCurrentEmail("liz@gmail.com");
    console.log("this.dataService.getCurrentEmail()",this.dataService.getCurrentEmail());

    await this.userService.getUserProfile(this.dataService.getCurrentEmail()).subscribe(data => {
      this.userProfile = data.body as User;

      this.userprofileForm = this.fb.group({
        userName: [this.userProfile.userName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        email: [this.userProfile.email],
        phone_no: [this.userProfile.phone_no, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        dob: [this.userProfile.dob],
        address: [this.userProfile.address, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      });

      console.log(this.userProfile);
    })


    const today = new Date();
    this.minDate = new Date(this.year - 100, 0, 1).toISOString().split('T')[0];
    this.maxDate = new Date(this.year - 12, 0, 1).toISOString().split('T')[0];
  }

  // convenience getter for easy access to form fields
  get f() { return this.userprofileForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    console.log("hi");
    this.submitted = true;
    if (this.userprofileForm.invalid) {
      return;
    } else {
      this.update = false;
      this.userProfile.userName = this.userprofileForm.get('userName').value;
      this.userProfile.email = this.userprofileForm.get('email').value;
      this.userProfile.phone_no = this.userprofileForm.get('phone_no').value;
      // this.userProfile.dob = this.userprofileForm.get('dob').value;
      this.userProfile.address = this.userprofileForm.get('address').value;
      console.log(this.userProfile);


      //api -> userProfile
      this.userService.editUserProfile(this.userProfile).subscribe(data => {
          this.successmsg = true;

          if (this.error) {
            setTimeout(() => {
              this.error = false;
            }, 3000);
          }
          if (this.successmsg) {
            setTimeout(() => {
              this.successmsg = false;
            }, 3000);
          }
        },
        error => {
          this.error = error ? error : '';
        });

      // this.working = true;
      // setTimeout(() => {
      //   // this.userprofileForm.reset();
      //   this.working = false;
      // }, 1000);
    }
  }
  submitForm() {
    // Add your logic for handling the form submission or any other action here.
    console.log('Image button clicked');
  }


  edit(){
    this.update = true;
    console.log(this.update);
  }
}
