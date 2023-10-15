import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { dataService } from "../../../dataService";
import { User } from 'src/app/core/models/auth.models';


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
  userId: number;
  submittedPassword: String;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private dataService: dataService,
              private authFackservice: AuthfakeauthenticationService
  ) { }

  ngOnInit() {
    sessionStorage.clear();
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
        const user = new User();
        user.email = this.email as string;
        user.userId = this.userId as number;
        this.authFackservice.currentUserSubject.next(user);

        if(data == 1){
          // this.dataService.setCurrentEmail(this.email);

          this.authenticationService.getUserAccessType(this.email).subscribe(data=>{
            console.log("getUserAccessType",data);
            if(data == 1){
              // store email as session token
              sessionStorage.setItem('email', this.email.toString());
              // store email as session token
              sessionStorage.setItem('userId', this.userId.toString());
              this.router.navigate(['/user/dashboard']);
            }
            else if(data == 3){
              console.log("admin login")
              // store email as session token
              sessionStorage.setItem('email', this.email.toString());
              // store email as session token
              sessionStorage.setItem('userId', this.userId.toString());
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
