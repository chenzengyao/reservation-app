package com.tablehop.tablehop_restaurant_app.DTO;

import org.springframework.boot.autoconfigure.web.WebProperties;
import java.util.Date;
import javax.persistence.*;

public class paymentDTO {

    public String getPaymentID() {
        return paymentID;
    }

    public void setPaymentID(String paymentID) {
        this.paymentID = paymentID;
    }

    public String getPayment_type() {
        return payment_type;
    }

    public void setPayment_type(String payment_type) {
        this.payment_type = payment_type;
    }

    public Date getPayment_dt() {
        return payment_dt;
    }

    public void setPayment_dt(Date payment_dt) {
        this.payment_dt = payment_dt;
    }

    public String getSub_total_price() {
        return sub_total_price;
    }

    public void setSub_total_price(String sub_total_price) {
        this.sub_total_price = sub_total_price;
    }

    public String getDiscount_coupun() {
        return discount_coupun;
    }

    public void setDiscount_coupun(String discount_coupun) {
        this.discount_coupun = discount_coupun;
    }

    public String getGst() {
        return gst;
    }

    public void setGst(String gst) {
        this.gst = gst;
    }

    public String getService_tax() {
        return service_tax;
    }

    public void setService_tax(String service_tax) {
        this.service_tax = service_tax;
    }

    public String getTotal_price() {
        return total_price;
    }

    public void setTotal_price(String total_price) {
        this.total_price = total_price;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    @Override
    public String toString() {
        return "paymentDTO{" +
                "paymentID='" + paymentID + '\'' +
                ", payment_type='" + payment_type + '\'' +
                ", payment_dt=" + payment_dt +
                ", sub_total_price='" + sub_total_price + '\'' +
                ", discount_coupun='" + discount_coupun + '\'' +
                ", gst='" + gst + '\'' +
                ", service_tax='" + service_tax + '\'' +
                ", total_price='" + total_price + '\'' +
                ", userID='" + userID + '\'' +
                ", orderID='" + orderID + '\'' +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String paymentID;

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
    private String userID;

    @Column(name = "orderID")
    private String orderID;

}
