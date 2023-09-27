package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class user {
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

    public String getUserID() {
        return this.userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone_no() {
        return this.phone_no;
    }

    public void setPhone_no(String phone_no) {
        this.phone_no = phone_no;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDob() {
        return this.dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getUser_type() {
        return this.user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public String getUser_access_type() {
        return this.user_access_type;
    }

    public void setUser_access_type(String user_access_type) {
        this.user_access_type = user_access_type;
    }

    public Date getCreated_dt() {
        return this.created_dt;
    }

    public void setCreated_dt(Date created_dt) {
        this.created_dt = created_dt;
    }

    public Date getUpdated_dt() {
        return this.updated_dt;
    }

    public void setUpdated_dt(Date updated_dt) {
        this.updated_dt = updated_dt;
    }

    @Override
    public String toString() {
        return "{" +
                " userID='" + getUserID() + "'" +
                ", userName='" + getUserName() + "'" +
                ", email='" + getEmail() + "'" +
                ", phone_no='" + getPhone_no() + "'" +
                ", address='" + getAddress() + "'" +
                ", dob='" + getDob() + "'" +
                ", user_type='" + getUser_type() + "'" +
                ", user_access_type='" + getUser_access_type() + "'" +
                ", created_dt='" + getCreated_dt() + "'" +
                ", updated_dt='" + getUpdated_dt() + "'" +
                "}";
    }

}
