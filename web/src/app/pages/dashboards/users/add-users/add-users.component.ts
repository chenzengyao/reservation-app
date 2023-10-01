import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  constructor() { }

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Add Users', active: true }];
  }

  submitUser() {
    console.log("submit user");
  }

}
