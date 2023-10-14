package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentID;

    @Column(name = "payment_type")
    private String payment_type;

    @Column(name = "payment_dt")
    private Date payment_dt;

    @Column(name = "sub_total_price")
    private String sub_total_price;

    @Column(name = "discount_coupun")
    private String discount_coupun;

    @Column(name = "gst")
    private String gst;

    @Column(name = "service_tax")
    private String service_tax;

    @Column(name = "total_price")
    private String total_price;

    @Column(name = "userID")
    private Integer userID;

    @Column(name = "orderID")
    private Integer orderID;

    public Integer getPaymentID() {
        return this.paymentID;
    }

    public void setPaymentID(Integer paymentID) {
        this.paymentID = paymentID;
    }

    public String getPayment_type() {
        return this.payment_type;
    }

    public void setPayment_type(String payment_type) {
        this.payment_type = payment_type;
    }

    public Date getPayment_dt() {
        return this.payment_dt;
    }

    public void setPayment_dt(Date payment_dt) {
        this.payment_dt = payment_dt;
    }

    public String getSub_total_price() { return this.sub_total_price;}

    public void setSub_total_price(String sub_total_price) {
        System.out.println("set sub_total: " + sub_total_price);
        this.sub_total_price = sub_total_price;
    }

    public String getDiscount_coupun() {
        return this.discount_coupun;
    }

    public void setDiscount_coupun(String discount_coupun) {
        this.discount_coupun = discount_coupun;
    }

    public String getGst() {
        return this.gst;
    }

    public void setGst(String gst) {
        this.gst = gst;
    }

    public String getService_tax() {
        return this.service_tax;
    }

    public void setService_tax(String service_tax) {
        this.service_tax = service_tax;
    }

    public String getTotal_price() {
        return this.total_price;
    }

    public void setTotal_price(String total_price) {
        this.total_price = total_price;
    }

    public Integer getUserID() {
        return this.userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getOrderID() {
        return this.orderID;
    }

    public void setOrderID(Integer orderID) {
        this.orderID = orderID;
    }

    @Override
    public String toString() {
        return "{" +
                " paymentID='" + getPaymentID() + "'" +
                ", payment_type='" + getPayment_type() + "'" +
                ", payment_dt='" + getPayment_dt() + "'" +
                ", sub_total_price='" + getSub_total_price() + "'" +
                ", discount_coupun='" + getDiscount_coupun() + "'" +
                ", gst='" + getGst() + "'" +
                ", service_tax='" + getService_tax() + "'" +
                ", total_price='" + getTotal_price() + "'" +
                ", userID='" + getUserID() + "'" +
                ", orderID='" + getOrderID() + "'" +
                "}";
    }

}
