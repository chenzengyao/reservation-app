import { Component, OnInit } from '@angular/core';
import { MenusService } from "../../../core/services/menus.service";
import { Menu } from "../../../core/models/menu.models";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss', './menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private menusService: MenusService) {
  }

  menu: Menu[] = [];
  selectedCategory: string="All";

  ngOnInit(): void {
    this.menusService.getAllMenuUser().subscribe(data =>{
      this.menu = data.body as Menu[];
    })

    console.log(this.menu[0].item_category);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
