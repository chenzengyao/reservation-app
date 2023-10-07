import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import{ MenusService } from'../../../../core/services/menus.service';
import { AuthenticationService } from'../../../../core/services/auth.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';



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

    config: DropzoneConfigInterface = {
      // Change this to your upload POST address:
      maxFilesize: 50,
      acceptedFiles: 'image/*',
      method: 'POST',
      uploadMultiple: false,
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
        item_created_dt: [''],
      });
    }

    get f() { return this.addMenuForm.controls; }

    onSubmit() {
      this.submitted = true;
      const current = new Date();
      var current_datetime = current.getTime();
      this.addMenuForm.value.item_created_dt = current_datetime;
      console.log(this.addMenuForm.value.item_created_dt);

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
        formData.append('item_created_dt',this.addMenuForm.value.item_created_dt);
        formData.append('image', this.file, this.image);

        this.menusService.addMenu(formData).subscribe(res => {

        })

      }

      this.working = true;
      setTimeout(() => {
        this.addMenuForm.reset();
        this.working = false;
      }, 1000);
    }

    onAccept(file: any){
      this.image = file.name;
      this.file = file;
    }

}
