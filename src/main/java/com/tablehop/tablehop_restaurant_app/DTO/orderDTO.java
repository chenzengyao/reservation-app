package com.tablehop.tablehop_restaurant_app.DTO;

import org.springframework.boot.autoconfigure.web.WebProperties;
import java.util.Date;
import javax.persistence.*;

public class orderDTO {

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getOrder_type() {
        return order_type;
    }

    public void setOrder_type(String order_type) {
        this.order_type = order_type;
    }

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }

    public String getDeliverer_address() {
        return deliverer_address;
    }

    public void setDeliverer_address(String deliverer_address) {
        this.deliverer_address = deliverer_address;
    }

    public Date getOrder_created_dt() {
        return order_created_dt;
    }

    public void setOrder_created_dt(Date order_created_dt) {
        this.order_created_dt = order_created_dt;
    }

    public Date getOrder_updated_dt() {
        return order_updated_dt;
    }

    public void setOrder_updated_dt(Date order_updated_dt) {
        this.order_updated_dt = order_updated_dt;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    public String getTableID() {
        return tableID;
    }

    public void setTableID(String tableID) {
        this.tableID = tableID;
    }

    public String getDeliveryID() {
        return deliveryID;
    }

    public void setDeliveryID(String deliveryID) {
        this.deliveryID = deliveryID;
    }

    @Override
    public String toString() {
        return "orderDTO{" +
                "orderID='" + orderID + '\'' +
                ", order_type='" + order_type + '\'' +
                ", order_status='" + order_status + '\'' +
                ", deliverer_address='" + deliverer_address + '\'' +
                ", order_created_dt=" + order_created_dt +
                ", order_updated_dt=" + order_updated_dt +
                ", updated_by='" + updated_by + '\'' +
                ", tableID='" + tableID + '\'' +
                ", deliveryID='" + deliveryID + '\'' +
                '}';
    }

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

}
