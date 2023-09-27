package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reservation")
public class reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String reservationID;

    @Column(name = "pax_no")
    private int pax_no;

    @Column(name = "reservation_dt")
    private Date reservation_dt;

    @Column(name = "reserve_status")
    private String reserve_status;

    @Column(name = "reserve_remark")
    private String reserve_remark;

    @Column(name = "reserve_created_dt")
    private Date reserve_created_dt;

    @Column(name = "tableID")
    private String tableID;

    @Column(name = "userID")
    private String userID;

    public String getReservationID() {
        return this.reservationID;
    }

    public void setReservationID(String reservationID) {
        this.reservationID = reservationID;
    }

    public int getPax_no() {
        return this.pax_no;
    }

    public void setPax_no(int pax_no) {
        this.pax_no = pax_no;
    }

    public Date getReservation_dt() {
        return this.reservation_dt;
    }

    public void setReservation_dt(Date reservation_dt) {
        this.reservation_dt = reservation_dt;
    }

    public String getReserve_status() {
        return this.reserve_status;
    }

    public void setReserve_status(String reserve_status) {
        this.reserve_status = reserve_status;
    }

    public String getReserve_remark() {
        return this.reserve_remark;
    }

    public void setReserve_remark(String reserve_remark) {
        this.reserve_remark = reserve_remark;
    }

    public Date getReserve_created_dt() {
        return this.reserve_created_dt;
    }

    public void setReserve_created_dt(Date reserve_created_dt) {
        this.reserve_created_dt = reserve_created_dt;
    }

    public String getTableID() {
        return this.tableID;
    }

    public void setTableID(String tableID) {
        this.tableID = tableID;
    }

    public String getUserID() {
        return this.userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    @Override
    public String toString() {
        return "{" +
                " reservationID='" + getReservationID() + "'" +
                ", pax_no='" + getPax_no() + "'" +
                ", reservation_dt='" + getReservation_dt() + "'" +
                ", reserve_status='" + getReserve_status() + "'" +
                ", reserve_remark='" + getReserve_remark() + "'" +
                ", reserve_created_dt='" + getReserve_created_dt() + "'" +
                ", tableID='" + getTableID() + "'" +
                ", userID='" + getUserID() + "'" +
                "}";
    }

}
