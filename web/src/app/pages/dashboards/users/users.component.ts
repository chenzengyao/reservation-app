import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../core/models/auth.models'
import { UserProfileService } from "../../../core/services/user.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private modalService: NgbModal, private userProfileService: UserProfileService, private router: Router,) { }

  users: User[] = [];
  userName: string;
  userId: number;
  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reservation' }, { label: 'Users', active: true }];
    this.userProfileService.getAllUser().subscribe(data => {
      this.users = data.body as User[];
      console.log(this.users);
    })
  }

  openModal(content: any, data: any) {
    this.userName = data.userName;
    this.userId = data.userID;
    this.modalService.open(content, { centered: true });
  }

  deleteUser() {
    this.userProfileService.deleteUser(this.userId).subscribe(data => {});
    this.userProfileService.getAllUser().subscribe(data => {
      this.users = data.body as User[];
      console.log(this.users);
    })
  }

}
