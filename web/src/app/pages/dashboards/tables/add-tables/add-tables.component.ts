import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tables } from 'src/app/core/models/tables.models';
import { TablesService } from 'src/app/core/services/tables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tables',
  templateUrl: './add-tables.component.html',
  styleUrls: ['./add-tables.component.scss']
})
export class AddTablesComponent implements OnInit {

  constructor(public tablesService: TablesService, private router: Router) { }

  breadCrumbItems: Array<{}>;
  table: Tables = new Tables();

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Add Tables', active: true }];
  }

  submitTables() {
    console.log(this.table);
    if (this.table.table_status == null || this.table.table_size == null) {
      alert("Please fill all the fields");
      return;
    }
    this.tablesService.adminAddTables(this.table).subscribe((res: any) => {
      let timerInterval;
      Swal.fire({
        title: 'Success',
        html: 'Table added successfully! ',
        timer: 2000,
        icon: 'success',
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        this.router.navigate(['/admin/tables/listing']);
      });
    });
  }

}
