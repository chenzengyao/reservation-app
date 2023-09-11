package com.tablehop.tablehop_restaurant_app.DTO;

import org.springframework.boot.autoconfigure.web.WebProperties;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table
public class userDTO {

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone_no() {
        return phone_no;
    }

    public void setPhone_no(String phone_no) {
        this.phone_no = phone_no;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public String getUser_access_type() {
        return user_access_type;
    }

    public void setUser_access_type(String user_access_type) {
        this.user_access_type = user_access_type;
    }

    public Date getCreated_dt() {
        return created_dt;
    }

    public void setCreated_dt(Date created_dt) {
        this.created_dt = created_dt;
    }

    public Date getUpdated_dt() {
        return updated_dt;
    }

    public void setUpdated_dt(Date updated_dt) {
        this.updated_dt = updated_dt;
    }

    @Override
    public String toString() {
        return "adminDTO{" +
                "userID='" + userID + '\'' +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", phone_no='" + phone_no + '\'' +
                ", address='" + address + '\'' +
                ", dob=" + dob +
                ", user_type='" + user_type + '\'' +
                ", user_access_type='" + user_access_type + '\'' +
                ", created_dt=" + created_dt +
                ", updated_dt=" + updated_dt +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String userID;
    @Column(name = "username")
    private String userName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_no")
    private String phone_no;

    @Column(name = "address")
    private String address;
    @Column(name = "dob")
    private Date dob;
    @Column(name = "user_type")
    private String user_type;
    @Column(name = "user_access_type")
    private String user_access_type;
    @Column(name = "created_dt")
    private Date created_dt;
    @Column(name = "updated_dt")
    private Date updated_dt;

}
