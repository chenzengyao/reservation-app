package com.tablehop.tablehop_restaurant_app.DTO;

import org.springframework.boot.autoconfigure.web.WebProperties;
import java.util.Date;
import javax.persistence.*;

public class itemDTO {
    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public String getItam_category() {
        return itam_category;
    }

    public void setItam_category(String itam_category) {
        this.itam_category = itam_category;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getItem_description() {
        return item_description;
    }

    public void setItem_description(String item_description) {
        this.item_description = item_description;
    }

    public String getItem_price() {
        return item_price;
    }

    public void setItem_price(String item_price) {
        this.item_price = item_price;
    }

    public String getItam_remark() {
        return itam_remark;
    }

    public void setItam_remark(String itam_remark) {
        this.itam_remark = itam_remark;
    }

    public String getItam_status() {
        return itam_status;
    }

    public void setItam_status(String itam_status) {
        this.itam_status = itam_status;
    }

    public Date getItem_created_dt() {
        return item_created_dt;
    }

    public void setItem_created_dt(Date item_created_dt) {
        this.item_created_dt = item_created_dt;
    }

    public Date getItem_updated_dt() {
        return item_updated_dt;
    }

    public void setItem_updated_dt(Date item_updated_dt) {
        this.item_updated_dt = item_updated_dt;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    @Override
    public String toString() {
        return "itemDTO{" +
                "itemID='" + itemID + '\'' +
                ", itam_category='" + itam_category + '\'' +
                ", item_name='" + item_name + '\'' +
                ", item_description='" + item_description + '\'' +
                ", item_price='" + item_price + '\'' +
                ", itam_remark='" + itam_remark + '\'' +
                ", itam_status='" + itam_status + '\'' +
                ", item_created_dt=" + item_created_dt +
                ", item_updated_dt=" + item_updated_dt +
                ", created_by='" + created_by + '\'' +
                ", updated_by='" + updated_by + '\'' +
                '}';
    }

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

}
