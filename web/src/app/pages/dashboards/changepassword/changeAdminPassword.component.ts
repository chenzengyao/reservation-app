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
  templateUrl: './changeAdminPassword.component.html',
  styleUrls: ['./changeAdminPassword.component.scss', 'changeAdminPassword.component.css']
})
export class ChangeAdminPasswordComponent implements OnInit {

  changeAdminPasswordForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  working = false;
  email: string;
  current_password: string = null;
  new_password: string = null;
  confirm_new_password: string = null;

  //Parameter to pass to Controller
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;


  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }

  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService,
    private dataService: dataService
  ) {}


  ngOnInit() {
    console.log(sessionStorage.getItem('email'));
    //Check for login user
    if (sessionStorage.getItem('email')==null){
      window.location.href = '/account/login';

    } else{
      this.email = sessionStorage.getItem('email');
      true;
    }

    this.changeAdminPasswordForm = this.formBuilder.group({
      current_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      new_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      confirm_new_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]]

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.changeAdminPasswordForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    console.log(this.email, this.current_password);

    // stop here if form is invalid
    if (this.changeAdminPasswordForm.invalid) {
      return;
    } else {
      this.current_password = this.f.current_password.value;
      this.new_password = this.f.new_password.value;
      this.confirm_new_password = this.f.confirm_new_password.value;
      this.authenticationService.checkCurrentPassword(this.email, this.current_password).subscribe(data=>{
        console.log("checkCurrentPassword", data);
        if(data == 1){
          // alert('Current Password is found');
          if(this.new_password == this.confirm_new_password) {

            if(this.current_password != this.confirm_new_password || this.current_password != this.new_password){
              console.log(this.email, this.new_password);
              this.authenticationService.UpdateNewPassword(this.email,this.new_password)
                .subscribe(
                  data => {
                    this.successmsg = true;
                    if (this.successmsg) {
                      alert('Update Password Successful');
                      this.router.navigate(['/admin/users/changeAdminpassword']);
                      this.changeAdminPasswordForm.reset();
                    }
                  },
                  error => {
                    this.error = error ? error : '';
                  });
            }
            else{
              alert('Current Password cannot same with New Password');
            }

          }
          else{
            alert('New Password and Confirm New Password unmatched.');
          }
        }
        else {
          alert('Current Password is wrong');
        }
      });
    }

    this.working = true;
    setTimeout(() => {
      // this.current_password = this.new_password;
      this.working = false;
      this.successmsg = false;
      this.submitted = false;
      // this.changeAdminPasswordForm.reset();
    }, 3000);
  }

  onClick(fieldNumber: number) {
    if (fieldNumber === 1) {
      this.show1 = !this.show1;
    } else if (fieldNumber === 2) {
      this.show2 = !this.show2;
    } else if (fieldNumber === 3) {
      this.show3 = !this.show3;
    }
  }

}
