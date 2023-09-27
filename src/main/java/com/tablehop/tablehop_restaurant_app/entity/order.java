package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order")
public class order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String orderID;

    @Column(name = "order_type")
    private String order_type;

    @Column(name = "order_status")
    private String order_status;

    @Column(name = "deliverer_address")
    private String deliverer_address;

    @Column(name = "order_created_dt")
    private Date order_created_dt;

    @Column(name = "order_updated_dt")
    private Date order_updated_dt;

    @Column(name = "updated_by")
    private String updated_by;

    @Column(name = "tableID")
    private String tableID;

    @Column(name = "deliveryID")
    private String deliveryID;

    public String getOrderID() {
        return this.orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getOrder_type() {
        return this.order_type;
    }

    public void setOrder_type(String order_type) {
        this.order_type = order_type;
    }

    public String getOrder_status() {
        return this.order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }

    public String getDeliverer_address() {
        return this.deliverer_address;
    }

    public void setDeliverer_address(String deliverer_address) {
        this.deliverer_address = deliverer_address;
    }

    public Date getOrder_created_dt() {
        return this.order_created_dt;
    }

    public void setOrder_created_dt(Date order_created_dt) {
        this.order_created_dt = order_created_dt;
    }

    public Date getOrder_updated_dt() {
        return this.order_updated_dt;
    }

    public void setOrder_updated_dt(Date order_updated_dt) {
        this.order_updated_dt = order_updated_dt;
    }

    public String getUpdated_by() {
        return this.updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    public String getTableID() {
        return this.tableID;
    }

    public void setTableID(String tableID) {
        this.tableID = tableID;
    }

    public String getDeliveryID() {
        return this.deliveryID;
    }

    public void setDeliveryID(String deliveryID) {
        this.deliveryID = deliveryID;
    }

    @Override
    public String toString() {
        return "{" +
                " orderID='" + getOrderID() + "'" +
                ", order_type='" + getOrder_type() + "'" +
                ", order_status='" + getOrder_status() + "'" +
                ", deliverer_address='" + getDeliverer_address() + "'" +
                ", order_created_dt='" + getOrder_created_dt() + "'" +
                ", order_updated_dt='" + getOrder_updated_dt() + "'" +
                ", updated_by='" + getUpdated_by() + "'" +
                ", tableID='" + getTableID() + "'" +
                ", deliveryID='" + getDeliveryID() + "'" +
                "}";
    }

}
