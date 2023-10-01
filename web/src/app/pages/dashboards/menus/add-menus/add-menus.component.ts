import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import{ MenusService } from'../../../../core/services/menus.service';
import { AuthenticationService } from'../../../../core/services/auth.service';
@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.scss']
})
export class AddMenusComponent implements OnInit {

  constructor(private menusService: MenusService, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private httpClient: HttpClient,
    private route: ActivatedRoute, private router: Router) { }

    addMenuForm: FormGroup;
    item_category: String;
    item_name: String;
    item_description: String;
    item_price: String;
    item_remark: String;
    item_status: String;
    item_image: String;
    item_created_dt: String;
    item_updated_dt;
    created_by;
    updated_by;
    submitted = false;
    successmsg = false;
    error = '';
    working = false;

    // image
    selectedFile: File;
    retrievedImage: any;
    message: string;
    isDisabled: boolean = true;
    event;
    url;
    current_user;

    ngOnInit(): void {
      //this one currently invalid, hardcode it first
      // this.current_user = this.authenticationService.currentUser()

      this.current_user = "Admin";
      this.addMenuForm = this.formBuilder.group({
        item_category: ['', Validators.required],
        item_name: ['', Validators.required],
        item_description: ['', Validators.required],
        item_price: ['', Validators.required],
        item_remark: ['', Validators.required],
        item_status: ['', Validators.required],
        item_image: ['', Validators.required],
        item_created_dt: ['', Validators.required],
        created_by: ['', Validators.required],
      });
    }

    get f() { return this.addMenuForm.controls; }

    onSubmit() {
      this.submitted = true;
      const current = new Date();
      var current_datetime = current.getTime();
      this.addMenuForm.value.item_created_dt = current_datetime;
      console.log(this.addMenuForm.value.item_created_dt);

      // image
      console.log("image: "+this.addMenuForm.value.item_image);
      var imageurl2 = this.addMenuForm.value.item_image.split("\\");
      console.log("imageurl2: "+ imageurl2);
      this.item_image = "itemImages/" + imageurl2[imageurl2.length - 1];
      console.log(this.item_image);

      console.log("menu parameter", this.addMenuForm.value.item_category, this.addMenuForm.value.item_name,
        this.addMenuForm.value.item_description, this.addMenuForm.value.item_price,
        this.addMenuForm.value.item_remark, this.addMenuForm.value.item_status, this.addMenuForm.value.item_image,
        this.addMenuForm.value.item_created_dt,
        this.current_user);


      // stop here if form is invalid
      if (this.addMenuForm.invalid) {
        console.log("Failed to upload");
        return;
      } else {
        //used to debug

        this.menusService.add(this.addMenuForm.value.item_category, this.addMenuForm.value.item_name,
          this.addMenuForm.value.item_description, this.addMenuForm.value.item_price,
          this.addMenuForm.value.item_remark, this.addMenuForm.value.item_status, this.addMenuForm.value.item_image,
          this.addMenuForm.value.item_created_dt,
          this.current_user)
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['/menus/listing']);
              }
            },
            error => {
              this.error = error ? error : '';
            });
      }

      this.working = true;
      setTimeout(() => {
        this.addMenuForm.reset();
        this.working = false;
      }, 1000);
    }

    onFileChanged(event){
      if(!event.target.files[0] || event.target.files[0].length == 0){
        this.message = "You must select an image!";
        return;
      }

      var mimeType = event.target.files[0].type;

      if(mimeType.match(/image\/*/) == null){
        this.message = "Only images are supported!";
        return;
      }
      // img input is string typee
      // console.log(this.createProductForm.value.img);
      // console.log(event.target.files[0].name);
      // console.log(event.target.files[0]);
      this.event = event;

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {
        this.message = "";
        this.url = reader.result;
      }
    }
}
