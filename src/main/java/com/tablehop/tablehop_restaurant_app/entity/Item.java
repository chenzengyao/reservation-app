package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemID;

    @Column(name = "item_category")
    private String item_category;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "item_description")
    private String item_description;

    @Column(name = "item_price")
    private String item_price;

    @Column(name = "item_remark")
    private String item_remark;

    @Column(name = "item_status")
    private String item_status;

    @Column(name = "item_image")
    private String item_image;

    @Column(name = "item_created_dt")
    private String item_created_dt;

    @Column(name = "item_updated_dt")
    private String item_updated_dt;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "updated_by")
    private String updated_by;

    public int getItemID() {
        return this.itemID;
    }

    public void setItemID(int itemID) {
        this.itemID = itemID;
    }

    public String getItem_category() {
        return this.item_category;
    }

    public void setItem_category(String item_category) {
        this.item_category = item_category;
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

    public String getItem_remark() {
        return this.item_remark;
    }

    public void setItem_remark(String item_remark) {
        this.item_remark = item_remark;
    }

    public String getItem_status() {
        return this.item_status;
    }

    public void setItem_status(String item_status) {
        this.item_status = item_status;
    }

    public String getItem_image() { return item_image; }

    public void setItem_image(String item_image) { this.item_image = item_image;}

    public String getItem_created_dt() {
        return this.item_created_dt;
    }

    public void setItem_created_dt(String item_created_dt) {
        this.item_created_dt = item_created_dt;
    }

    public String getItem_updated_dt() {
        return this.item_updated_dt;
    }

    public void setItem_updated_dt(String item_updated_dt) {
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
                ", item_category='" + getItem_category() + "'" +
                ", item_name='" + getItem_name() + "'" +
                ", item_description='" + getItem_description() + "'" +
                ", item_price='" + getItem_price() + "'" +
                ", item_remark='" + getItem_remark() + "'" +
                ", item_status='" + getItem_status() + "'" +
                ", item_image='" + getItem_image() + "'" +
                ", item_created_dt='" + getItem_created_dt() + "'" +
                ", item_updated_dt='" + getItem_updated_dt() + "'" +
                ", created_by='" + getCreated_by() + "'" +
                ", updated_by='" + getUpdated_by() + "'" +
                "}";
    }

}
