package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String itemID;

    @Column(name = "itam_category")
    private String itam_category;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "item_description")
    private String item_description;

    @Column(name = "item_price")
    private String item_price;

    @Column(name = "itam_remark")
    private String itam_remark;

    @Column(name = "itam_status")
    private String itam_status;

    @Column(name = "item_created_dt")
    private Date item_created_dt;

    @Column(name = "item_updated_dt")
    private Date item_updated_dt;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "updated_by")
    private String updated_by;

    public String getItemID() {
        return this.itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public String getItam_category() {
        return this.itam_category;
    }

    public void setItam_category(String itam_category) {
        this.itam_category = itam_category;
    }

    public String getItem_name() {
        return this.item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getItem_description() {
        return this.item_description;
    }

    public void setItem_description(String item_description) {
        this.item_description = item_description;
    }

    public String getItem_price() {
        return this.item_price;
    }

    public void setItem_price(String item_price) {
        this.item_price = item_price;
    }

    public String getItam_remark() {
        return this.itam_remark;
    }

    public void setItam_remark(String itam_remark) {
        this.itam_remark = itam_remark;
    }

    public String getItam_status() {
        return this.itam_status;
    }

    public void setItam_status(String itam_status) {
        this.itam_status = itam_status;
    }

    public Date getItem_created_dt() {
        return this.item_created_dt;
    }

    public void setItem_created_dt(Date item_created_dt) {
        this.item_created_dt = item_created_dt;
    }

    public Date getItem_updated_dt() {
        return this.item_updated_dt;
    }

    public void setItem_updated_dt(Date item_updated_dt) {
        this.item_updated_dt = item_updated_dt;
    }

    public String getCreated_by() {
        return this.created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getUpdated_by() {
        return this.updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    @Override
    public String toString() {
        return "{" +
                " itemID='" + getItemID() + "'" +
                ", itam_category='" + getItam_category() + "'" +
                ", item_name='" + getItem_name() + "'" +
                ", item_description='" + getItem_description() + "'" +
                ", item_price='" + getItem_price() + "'" +
                ", itam_remark='" + getItam_remark() + "'" +
                ", itam_status='" + getItam_status() + "'" +
                ", item_created_dt='" + getItem_created_dt() + "'" +
                ", item_updated_dt='" + getItem_updated_dt() + "'" +
                ", created_by='" + getCreated_by() + "'" +
                ", updated_by='" + getUpdated_by() + "'" +
                "}";
    }

}
