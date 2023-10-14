import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MenusService} from "../../../core/services/menus.service";
import {Menu} from "../../../core/models/menu.models";
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: "app-menus",
  templateUrl: "./menus.component.html",
  styleUrls: ["./menus.component.scss"],
})
export class MenusComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private menusService: MenusService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  menu: Menu[] = [];
  edit: boolean = false;
  viewMenu: any = [];
  editMenuForm: FormGroup;
  submitted: boolean = false;
  item_image: any = null;
  working: boolean = false;
  imagePath: any;
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  canUploadImage: boolean = false;


  ngOnInit(): void {
    
    //Check for login user
    if (sessionStorage.getItem('email')==null){
      window.location.href = '/account/login';
    } else{
      true;
    }

    this.menusService.getAllMenu().subscribe(data =>{
      this.menu = data.body as Menu[];
    })
  }

  openModal(content: any, data: Menu) {
    this.submitted = false;
    this.edit = false;
    this.viewMenu = data;
    this.canUploadImage = false;

    console.log("edit", this.edit);
    console.log("upload image", this.canUploadImage);
    console.log(this.viewMenu);
    this.editMenuForm = this.formBuilder.group({
      item_category: [this.viewMenu.item_category],
      item_name: [this.viewMenu.item_name],
      item_description: [this.viewMenu.item_description],
      item_price: [this.viewMenu.item_price],
      item_remark: [this.viewMenu.item_remark],
      item_status: [this.viewMenu.item_status],
      item_image: [],
    });
    this.imagePath = "https://res.cloudinary.com/hx1dfduy4/assests/images/" + this.viewMenu.item_image;
    // this.imagePath = this.getSafeImagePath(this.imagePath);
    console.log(this.imagePath);
    this.modalService.open(content, { centered: true });
  }

  get f() { return this.editMenuForm.controls; }

  enableEdit() {
    this.edit = true;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editMenuForm.invalid) {
      console.log("Failed to upload");
      return;
    } else {
      const formData = new FormData();
      formData.append('item_id', this.viewMenu.itemID);
      formData.append('item_category',this.editMenuForm.value.item_category);
      formData.append('item_name',this.editMenuForm.value.item_name);
      formData.append('item_description',this.editMenuForm.value.item_description);
      formData.append('item_price',this.editMenuForm.value.item_price);
      formData.append('item_remark',this.editMenuForm.value.item_remark);
      formData.append('item_status',this.editMenuForm.value.item_status);
      console.log("append", this.selectedFile);
      console.log("append 2", this.viewMenu.item_image);
      if(this.selectedFile == null){
        formData.append('image',this.viewMenu.item_image);
        formData.append('imageFile', '');
      } else{
        formData.append('image',null);
        formData.append('imageFile', this.selectedFile);
      }
      console.log(this.selectedFile);


      this.menusService.modifyMenu(formData).subscribe(res => {})

    }

    this.working = true;
    setTimeout(() => {
      this.working = false;
      this.submitted = false;
    }, 1000);
  }

  onFileUploadSuccess(event: any) {
    this.item_image = event[0];
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


  getSafeImagePath(path: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  enableChangeImage(){
    console.log("edit", this.edit);
    console.log("upload image", this.canUploadImage);
    this.canUploadImage = true;
  }
}
