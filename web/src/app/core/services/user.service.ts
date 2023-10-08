import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';

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


    // register(username: String, email: String, password: String, dob: String) {
    //     return this.http.post(`/users/register`, username, email, password, dob);
    // }
}
