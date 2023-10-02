import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { UserProfileService } from '../../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { dataService } from "../../../dataService";


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

  //Parameter to pass to Controller
  email: String;
  current_password: String;
  new_password: String;
  confirm_new_password: String;
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
    this.email = this.dataService.getCurrentEmail();

    this.changepasswordForm = this.formBuilder.group({
      current_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      new_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      confirm_new_password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]]

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.changepasswordForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    console.log(this.email, this.current_password);

    // stop here if form is invalid
    if (this.changepasswordForm.invalid) {
      return;
    } else {
      this.authenticationService.checkCurrentPassword(this.email,this.current_password).subscribe(data=>{
        console.log("checkCurrentPassword", data);
        if(data == 1){
          // alert('Current Password is found');
          if(this.new_password == this.confirm_new_password) {
            console.log(this.email, this.new_password);
            this.authenticationService.UpdateNewPassword(this.email,this.new_password)
              .subscribe(
                data => {
                  this.successmsg = true;
                  if (this.successmsg) {
                    this.router.navigate(['/account/changepassword']);
                  }
                },
                error => {
                  this.error = error ? error : '';
                });
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
      // this.changepasswordForm.reset();
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
