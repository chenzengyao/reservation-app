package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderID;

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
    private Integer tableID;

    @Column(name = "deliveryID")
    private Integer deliveryID;

    @Column(name = "reservationID")
    private Integer reservationID;

    @Transient
    private List<OrderItem> orderItemList;

    public Integer getOrderID() {
        return this.orderID;
    }

    public void setOrderID(Integer orderID) {
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

    public Integer getTableID() {
        return this.tableID;
    }

    public void setTableID(Integer tableID) {
        this.tableID = tableID;
    }

    public Integer getDeliveryID() {
        return this.deliveryID;
    }

    public void setDeliveryID(Integer deliveryID) {
        this.deliveryID = deliveryID;
    }

    public Integer getReservationID() {
        return this.reservationID;
    }

    public void setReservationID(Integer reservationID) {
        this.reservationID = reservationID;
    }

    public List<OrderItem> getOrderItemList() {
        return this.orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
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
                ", reservationID='" + getReservationID() + "'" +
                "}";
    }

}
