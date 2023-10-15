import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';
import { apiLink } from '../helpers/helper';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    getUserProfile(email: String){
        return this.http.get("/user/profile?email=" + email, { observe: 'response' });
    }

    editUserProfile(userProfile: User){
       return this.http.post("/user/edituserprofile", userProfile, { observe: 'response' })
    }

    getAllUser() {
      return this.http.get("/admin/getAllUser", { observe: 'response' });
    }

    deleteUser(userID: number) {
      console.log(userID);
      return this.http.post("/admin/deleteUser?userID=" + userID, { observe: 'response' });
    }

    getUserByName(userName: string) {
      return this.http.get(apiLink() + "/admin/user/getUserByName?userName=" + userName, { observe: 'response' });
    }

}
