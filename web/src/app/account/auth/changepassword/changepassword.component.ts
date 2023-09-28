import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']

})
export class ChangepasswordComponent implements OnInit {

  changepasswordForm: FormGroup;
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
  current_password;
  new_password;
  confirm_new_password;
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
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
              private userService: UserProfileService) {
  }


  ngOnInit() {
    this.current_password = 'password';
    this.new_password = 'password';
    this.confirm_new_password = 'password2';
    const today = new Date();
    this.minDate = new Date(this.year - 100, 0, 1).toISOString().split('T')[0];
    this.maxDate = new Date(this.year - 12, 0, 1).toISOString().split('T')[0];
    this.changepasswordForm = this.formBuilder.group({
      current_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      new_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      confirm_new_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]]

    });
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  // convenience getter for easy access to form fields
  get f() { return this.changepasswordForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.changepasswordForm.invalid) {
      return;
    } else {
      // if (environment.defaultauth === 'firebase') {
      //   this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
      //     this.successmsg = true;
      //     if (this.successmsg) {
      //       this.router.navigate(['/dashboard']);
      //     }
      //   })
      //     .catch(error => {
      //       this.error = error ? error : '';
      //     });
      // } else {
      //   this.userService.register(this.changepasswordForm.value)
      //     .pipe(first())
      //     .subscribe(
      //       data => {
      //         this.successmsg = true;
      //         if (this.successmsg) {
      //           this.router.navigate(['/account/login']);
      //         }
      //       },
      //       error => {
      //         this.error = error ? error : '';
      //       });
      // }
    }

    this.working = true;
    setTimeout(() => {
      this.changepasswordForm.reset();
      this.working = false;
    }, 1000);
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
