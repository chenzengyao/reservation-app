import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { dataService } from "../../../dataService";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  password;
  show = false;
  email: String;
  submittedPassword: String;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private dataService: dataService
  ) { }

  ngOnInit() {
    this.password = 'password';
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    console.log("checkExistUser", this.email, this.submittedPassword);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService.checkExistUser(this.email, this.submittedPassword).subscribe(data=>{
        // console.log("checkExistUser", data);

        localStorage.setItem('currentUser', JSON.stringify(this.email));

        if(data == 1){
          // this.dataService.setCurrentEmail(this.email);

          this.authenticationService.getUserAccessType(this.email).subscribe(data=>{
            console.log("getUserAccessType",data);
            if(data == 1){
              // store email as session token
              sessionStorage.setItem('email', this.email.toString());
              this.router.navigate(['/user/dashboard']);
            }
            else if(data == 3){
              console.log("admin login")
              this.router.navigate(['/admin/dashboard']);
            }
          })

        } else {
          alert('This account is invalid. Please register first.');
          // this.router.navigate(['/account/signup']);
        }
      });
    }
  }

  getSession() {
    return sessionStorage.getItem('email');
  }

  logout(){
    sessionStorage.clear();
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
