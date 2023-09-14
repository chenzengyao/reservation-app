package com.tablehop.tablehop_restaurant_app.DTO;

import org.springframework.boot.autoconfigure.web.WebProperties;
import java.util.Date;
import javax.persistence.*;

public class deliveryDTO {

    public String getDeliveryID() {
        return deliveryID;
    }

    public void setDeliveryID(String deliveryID) {
        this.deliveryID = deliveryID;
    }

    public String getDelivery_status() {
        return delivery_status;
    }

    public void setDelivery_status(String delivery_status) {
        this.delivery_status = delivery_status;
    }

    public String getDelivery_remark() {
        return delivery_remark;
    }

    public void setDelivery_remark(String delivery_remark) {
        this.delivery_remark = delivery_remark;
    }

    public Date getDelivery_start_dt() {
        return delivery_start_dt;
    }

    public void setDelivery_start_dt(Date delivery_start_dt) {
        this.delivery_start_dt = delivery_start_dt;
    }

    public Date getDelivery_completed_dt() {
        return delivery_completed_dt;
    }

    public void setDelivery_completed_dt(Date delivery_completed_dt) {
        this.delivery_completed_dt = delivery_completed_dt;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    public String getArranged_by() {
        return arranged_by;
    }

    public void setArranged_by(String arranged_by) {
        this.arranged_by = arranged_by;
    }

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getDeliverymanID() {
        return deliverymanID;
    }

    public void setDeliverymanID(String deliverymanID) {
        this.deliverymanID = deliverymanID;
    }

    @Override
    public String toString() {
        return "deliveryDTO{" +
                "deliveryID='" + deliveryID + '\'' +
                ", delivery_status='" + delivery_status + '\'' +
                ", delivery_remark='" + delivery_remark + '\'' +
                ", delivery_start_dt=" + delivery_start_dt +
                ", delivery_completed_dt=" + delivery_completed_dt +
                ", updated_by='" + updated_by + '\'' +
                ", arranged_by='" + arranged_by + '\'' +
                ", orderID='" + orderID + '\'' +
                ", deliverymanID='" + deliverymanID + '\'' +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String deliveryID;

    @Column(name = "delivery_status")
    private String delivery_status;

    @Column(name = "delivery_remark")
    private String delivery_remark;

    @Column(name = "delivery_start_dt")
    private Date delivery_start_dt;

    @Column(name = "delivery_completed_dt")
    private Date delivery_completed_dt;

    @Column(name = "updated_by")
    private String updated_by;

    @Column(name = "arranged_by")
    private String arranged_by;

    @Column(name = "orderID")
    private String orderID;

    @Column(name = "deliverymanID")
    private String deliverymanID;

}
