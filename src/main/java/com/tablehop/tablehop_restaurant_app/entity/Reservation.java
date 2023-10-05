package com.tablehop.tablehop_restaurant_app.entity;

import java.sql.Timestamp;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reservationID;

    @Column(name = "pax_no")
    private int pax_no;

    @Column(name = "reservation_dt")
    private Timestamp reservation_dt;

    @Column(name = "reserve_status")
    private String reserve_status;

    @Column(name = "reserve_remark")
    private String reserve_remark;

    @Column(name = "reserve_created_dt")
    private Timestamp reserve_created_dt;

    @Column(name = "tableID")
    private Integer tableID;

    @Column(name = "userID")
    private Integer userID;

    public Integer getReservationID() {
        return this.reservationID;
    }

    public void setReservationID(Integer reservationID) {
        this.reservationID = reservationID;
    }

    public int getPax_no() {
        return this.pax_no;
    }

    public void setPax_no(int pax_no) {
        this.pax_no = pax_no;
    }

    public Timestamp getReservation_dt() {
        return this.reservation_dt;
    }

    public void setReservation_dt(Timestamp reservation_dt) {
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

    public Timestamp getReserve_created_dt() {
        return this.reserve_created_dt;
    }

    public void setReserve_created_dt(Timestamp reserve_created_dt) {
        this.reserve_created_dt = reserve_created_dt;
    }

    public Integer getTableID() {
        return this.tableID;
    }

    public void setTableID(Integer tableID) {
        this.tableID = tableID;
    }

    public Integer getUserID() {
        return this.userID;
    }

    public void setUserID(Integer userID) {
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
