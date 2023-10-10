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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
              private userService: UserProfileService) { }

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Add Users', active: true }];
    this.minDate = new Date(this.year - 100, 0, 1).toISOString().split('T')[0];
    this.maxDate = new Date(this.year - 12, 0, 1).toISOString().split('T')[0];
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required,Validators.minLength(3)],
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
      this.authenticationService.checkExistEmail(this.f.username.value).subscribe(data => {
        if (data == 1) {
          alert('This email account already exist.');
        }else{
          const username = this.f.username.value;
          const email = this.f.email.value;
          const phone_no = this.f.phone_no.value;
          const dob = this.f.dob.value;
          const role = this.f.role.value;
          console.log(username, email, phone_no, dob, role);
          this.authenticationService.adminRegister(username, email, phone_no, dob, role).subscribe(data => {
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
