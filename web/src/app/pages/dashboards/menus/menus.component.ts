import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MenusService } from "../../../core/services/menus.service";
import { Menu } from "../../../core/models/menu.models";

@Component({
  selector: "app-menus",
  templateUrl: "./menus.component.html",
  styleUrls: ["./menus.component.scss"],
})
export class MenusComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private menusService: MenusService
  ) {}

  menu: Menu[] = [];

  ngOnInit(): void {
    this.menusService.getAllMenu().subscribe(data =>{
      this.menu = data.body as Menu[];
    })
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
