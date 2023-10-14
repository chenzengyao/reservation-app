import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tables } from 'src/app/core/models/tables.models';
import { TablesService } from 'src/app/core/services/tables.service';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {

  constructor(private modalService: NgbModal, private el: ElementRef, public tablesService: TablesService) { }

  tablesList: Tables[] = [];
  breadCrumbItems: Array<{}>;
  tableEntity: Tables = new Tables();

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Tables', active: true }];
  }

  async ngAfterViewInit() {
    await this.tablesService.adminGetTables().toPromise().then((res: any) => {
      console.log(res);
      this.tablesList = res;
    });
    const cthis = this;
    setTimeout(() => {
      // console.warn("after ", $('.tables').length);
      $('.tables').draggable({
        drag: function(e, ui) {
          var offset = $(this).offset();
          var left = Math.abs(ui.position.left);
          var top = Math.abs(ui.position.top);
          // console.log(ui.position, $(this).offset());
        },
        stop: function (event, ui) {
          console.log(ui.position, $(this).offset());
          var left = ui.position.left;
          var top = ui.position.top;
          cthis.tableEntity = cthis.tablesList.filter((table: any) => {
            return table.tableID == this.id.split('_')[1];
          })[0];
          if (cthis.tableEntity != null) {
            cthis.tableEntity.table_x = left;
            cthis.tableEntity.table_y = top;
          }
          console.log(cthis.tableEntity);
          cthis.saveTablePosition();
        },
        containment: $('#containment'),
      });
    }, 1000);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  saveTablePosition() {
    this.tablesService.adminUpdateTablesPosition(this.tableEntity).subscribe((res: any) => {
      console.log(res);
    });
  }

}
