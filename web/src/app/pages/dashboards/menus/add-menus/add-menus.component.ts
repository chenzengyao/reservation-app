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
    item_category;
    item_name: String;
    item_description;
    item_price;
    item_remark;
    item_status;
    item_image;
    item_created_dt;
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
    base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;

    // get called when user select an image
    // public onFileChanged(event){
    //   // select file
    //   this.selectedFile = event.targer.files[0];
    //   console.log(this.selectedFile);
    // }

    // get called when user clicks on submit to upload the image
    onUpload(){
      // formdata API provie method and properties to allow us easily prepare form data to be sent with POST HTTP request
      //const upLoadImageData = new FormData();
      //upLoadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }

    // img
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

  formatDecimal(input) {
    // Remove any non-numeric characters
    input.value = input.value.replace(/[^0-9.]/g, '');

    // Format the value to two decimal places
    input.value = parseFloat(input.value).toFixed(2);
    // return input;
  }

  onSubmit() {
    this.submitted = true;
    const current = new Date();
    this.item_created_dt = current.getTime();
    console.log(this.item_created_dt);

    // image
    console.log("image: "+this.item_image);
    var imageurl2 = this.item_image.split("\\");
    console.log("imageurl2: "+ imageurl2);
    this.item_image = imageurl2[imageurl2.length - 1];
    console.log(this.item_image);


    // stop here if form is invalid
    if (this.addMenuForm.invalid) {
      return;
    } else {
      //used to debug
      console.log("menu parameter", this.item_category, this.item_name, this.item_description, this.item_price,
      this.item_remark, this.item_status, this.item_image, this.item_created_dt,
      this.current_user);

      this.menusService.add(this.item_category, this.item_name, this.item_description, this.item_price,
        this.item_remark, this.item_status, this.item_image, this.item_created_dt,
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
