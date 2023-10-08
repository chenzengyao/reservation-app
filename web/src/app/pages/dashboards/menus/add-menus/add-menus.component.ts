import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import{ MenusService } from'../../../../core/services/menus.service';
import { AuthenticationService } from'../../../../core/services/auth.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {formatDate } from '@angular/common';


@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.scss']
})
export class AddMenusComponent implements OnInit {

  constructor(private menusService: MenusService, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private httpClient: HttpClient,
    private route: ActivatedRoute, private router: Router) {

  }

    addMenuForm: FormGroup;
    item_category: String;
    item_name: String;
    item_description: String;
    item_price: String;
    item_remark: String;
    item_status: String;
    item_image: File;
    item_created_dt: String;
    item_updated_dt: String;
    created_by: String;
    updated_by: String;
    submitted = false;
    successmsg = false;
    error = '';
    working = false;

    // image
    selectedFile: File;
    retrievedImage: any;
    message: string;
    isDisabled: boolean = true;
    event: any;
    url: any;
    current_user: String;
    image: '';
    file: '';

    today= new Date();
    jstoday = '';

    config: DropzoneConfigInterface = {
      // Change this to your upload POST address:
      maxFilesize: 50,
      acceptedFiles: 'image/*',
      method: 'POST',
      uploadMultiple: false,
      maxFiles: 1,
      accept: (file) => {
        this.onAccept(file);
      }
    };

    ngOnInit(): void {
      //this one currently invalid, hardcode it first
      // this.current_user = this.authenticationService.currentUser()

      this.current_user = "Admin";
      this.addMenuForm = this.formBuilder.group({
        item_category: [''],
        item_name: [''],
        item_description: [''],
        item_price: [''],
        item_remark: [''],
        item_status: [''],
        item_image: [''],
      });

    }

    get f() { return this.addMenuForm.controls; }

    onSubmit() {
      // Get now timestamp
      this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+08:00');
      console.log(this.jstoday);

      this.submitted = true;

      // stop here if form is invalid
      if (this.addMenuForm.invalid) {
        console.log("Failed to upload");
        return;
      } else {
        const formData = new FormData();
        formData.append('item_category',this.addMenuForm.value.item_category);
        formData.append('item_name',this.addMenuForm.value.item_name);
        formData.append('item_description',this.addMenuForm.value.item_description);
        formData.append('item_price',this.addMenuForm.value.item_price);
        formData.append('item_remark',this.addMenuForm.value.item_remark);
        formData.append('item_status',this.addMenuForm.value.item_status);
        formData.append('image', this.item_image);
        console.log(this.item_image);

        this.menusService.addMenu(formData).subscribe(res => {})

      }

      this.working = true;
      setTimeout(() => {
        this.addMenuForm.reset();
        this.working = false;
      }, 1000);
    }


  onFileUploadSuccess(event: any) {
    this.item_image = event[0];
    console.log(this.item_image);
  }

  onAccept(file: any) {
    this.item_image = file;
  }

}
