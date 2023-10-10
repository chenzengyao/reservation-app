import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../../../../core/services/auth.service";
import { UserProfileService } from "../../../../core/services/user.service";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  addUserForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  working = false;
  minDate: string;
  maxDate: string;
  year: number = new Date().getFullYear();
  user_access_type: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
              private userService: UserProfileService) { }

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Add Users', active: true }];
    this.minDate = new Date(this.year - 100, 0, 1).toISOString().split('T')[0];
    this.maxDate = new Date(this.year - 12, 0, 1).toISOString().split('T')[0];
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone_no: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8),Validators.pattern(
        /[0-9]/)]],
      role: ['',Validators.required],
      dob: ['',Validators.required],
    });
  }

  get f() { return this.addUserForm.controls; }

  submitUser() {
    console.log("submit user");
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    } else {
      this.authenticationService.checkExistEmail(this.f.email.value).subscribe(data => {
        console.log(data);
        if (data == 1) {
          alert('This email account already exist.');
        }else {

          const username = this.f.username.value;
          const email = this.f.email.value;
          const phone_no = this.f.phone_no.value;
          const dob = this.f.dob.value;
          const role = this.f.role.value;
          console.log(username, email, phone_no, dob, role);
          if (this.f.role.value == 'Admin') {
            this.user_access_type = 3;}
          else if (this.f.role.value == 'Delivery Man') {
            this.user_access_type= 2;}
          else if (this.f.role.value == 'Member') {
            this.user_access_type = 1;}

            this.authenticationService.adminRegister(username, email, phone_no, dob, role, this.user_access_type).subscribe(data => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['/admin/users/listing']);
              }
              alert('Register Successfully.');
            });

        }
      });
    }
    this.working = true;
    setTimeout(() => {
      // this.addUserForm.reset();
      this.working = false;
      this.submitted = false;
    }, 1000);

  }

}
