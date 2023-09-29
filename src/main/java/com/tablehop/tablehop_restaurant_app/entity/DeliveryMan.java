package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "deliveryman")
public class DeliveryMan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String deliverymanID;

    @Column(name = "deliveryman_phone_no")
    private String deliveryman_phone_no;

    @Column(name = "deliveryman_created_dt")
    private Date deliveryman_created_dt;

    @Column(name = "deliveryman_updated_dt")
    private Date deliveryman_updated_dt;

    @Column(name = "deliveryID")
    private String deliveryID;

    public String getDeliverymanID() {
        return this.deliverymanID;
    }

    public void setDeliverymanID(String deliverymanID) {
        this.deliverymanID = deliverymanID;
    }

    public String getDeliveryman_phone_no() {
        return this.deliveryman_phone_no;
    }

    public void setDeliveryman_phone_no(String deliveryman_phone_no) {
        this.deliveryman_phone_no = deliveryman_phone_no;
    }

    public Date getDeliveryman_created_dt() {
        return this.deliveryman_created_dt;
    }

    public void setDeliveryman_created_dt(Date deliveryman_created_dt) {
        this.deliveryman_created_dt = deliveryman_created_dt;
    }

    public Date getDeliveryman_updated_dt() {
        return this.deliveryman_updated_dt;
    }

    public void setDeliveryman_updated_dt(Date deliveryman_updated_dt) {
        this.deliveryman_updated_dt = deliveryman_updated_dt;
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
                " deliverymanID='" + getDeliverymanID() + "'" +
                ", deliveryman_phone_no='" + getDeliveryman_phone_no() + "'" +
                ", deliveryman_created_dt='" + getDeliveryman_created_dt() + "'" +
                ", deliveryman_updated_dt='" + getDeliveryman_updated_dt() + "'" +
                ", deliveryID='" + getDeliveryID() + "'" +
                "}";
    }

}
