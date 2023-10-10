import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']

})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  working = false;
  minDate:string;
  maxDate:string;
  name :'dobdate';
  confirm_password: string;
  show1: boolean = false;
  show2: boolean = false;
  password;

  //Parameter to pass to Controller
  username: string;
  email: string;
  submittedPassword: string;
  phone_no: string;
  dob: string;


  transform(value: string) {
       var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'dd/MM/yyyy');
        return value;
    }

  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService) {
  }


  ngOnInit() {
    this.password = 'password';
    this.confirm_password = 'password2';
    const today = new Date();
    this.minDate = new Date(this.year - 100, 0, 1).toISOString().split('T')[0];
    this.maxDate = new Date(this.year - 12, 0, 1).toISOString().split('T')[0];
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone_no: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8),Validators.pattern(
        /[0-9]/)]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      dob: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;




    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      this.authenticationService.checkExistEmail(this.email).subscribe(data=>{
        console.log("checkExistEmail", data);
        if(data == 1){
          alert('This email account already exist.');
        }
        else {
          this.username = this.f.username.value;
          console.log(this.username, this.email, this.phone_no, this.submittedPassword, this.dob);
          this.authenticationService.register(this.username, this.email, this.phone_no, this.submittedPassword, this.dob)
            .subscribe(
              data => {
                this.successmsg = true;
                if (this.successmsg) {
                  this.router.navigate(['/account/login']);
                }
                alert('Register Successfully.');
              },
              error => {
                this.error = error ? error : '';
              });

        }
      });
    }
    this.working = true;
    setTimeout(() => {
      // this.signupForm.reset();
      this.working = false;
    }, 1000);

  }

  onClick(fieldNumber: number) {
    if (fieldNumber === 1) {
      this.show1 = !this.show1;
    } else if (fieldNumber === 2) {
      this.show2 = !this.show2;
    }
  }


}
