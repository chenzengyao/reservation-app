import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;

    constructor(private http: HttpClient) { }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
      register(username: String, email: String, phone_no: String, password: String, dob: String) {
        console.log("dob", dob);
        return this.http.post(`/users/register?username=` + username + '&email=' + email + '&phone_no=' + phone_no + '&password=' + password + '&dob=' + dob,{ observe: 'response' });
      }

      /**
       * Admin Performs the register
       */
      adminRegister(username: String, email: String, phone_no: String, dob: String, role: String) {
        return this.http.post(`/admin/users/add/register?username=` + username + '&email=' + email + '&phone_no=' + phone_no + '&dob=' + dob + '&role=' + role ,{ observe: 'response' });
      }


    /**
     * Find exists email
     * @param email email
     */
    checkExistEmail(email: String) {
      return this.http.get(`/users/checkExistEmail?email=` + email);
    }

    /**
     * Get User Details
     * @param email email
     */
    getUserDetails(email: String) {
      return this.http.get(`/users/getDetails?email=` + email);
    }

    /**
     * Get UserType
     * @param email email
     */
    getUserAccessType(email: String) {
      return this.http.get(`/users/useraccesstype?email=` + email);
    }

    /**
     * Find exists email with password
     * @param email email
     * @param password password
     */
    checkExistUser(email: String, password: String) {
      return this.http.get(`/users/checkExistUser?email=` + email + '&password=' + password);
    }

    /**
     * Get Login User Details
     * @param email email
     * @param password password
     */
    getLoginDetails(email: String, password: String) {
      return this.http.get(`/users/getLoginDetails?email=` + email + '&password=' + password);
    }

    /**
     * Match current password
     * @param email email
     * @param current_password current_password
     */
    checkCurrentPassword(email: String, current_password: String) {
      return this.http.get(`/users/checkCurrentPassword?email=` + email + '&current_password=' + current_password);
    }


    /**
     * Update the current password to new password
     * @param email email
     * @param new_password new_password
     */
    UpdateNewPassword(email: String, new_password: String) {
      return this.http.post(`/users/UpdateNewPassword?email=` + email + '&new_password=' + new_password,{ observe: 'response' });
    }
    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }

}

