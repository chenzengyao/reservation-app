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
    const today = new Date();
    this.minDate = new Date(this.year - 100, 0, 1).toISOString().split('T')[0];
    this.maxDate = new Date(this.year - 12, 0, 1).toISOString().split('T')[0];
    this.userprofileForm = this.formBuilder.group({
      username: ['Ching Yee', Validators.required],
      email: ['lizyee3174@gmail.com', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phone_no: ['012345678', Validators.required],
      address: []
    });
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
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
      //   this.userService.register(this.userprofileForm.value)
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
      this.userprofileForm.reset();
      this.working = false;
    }, 1000);
  }
}
