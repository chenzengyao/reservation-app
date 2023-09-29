package com.tablehop.tablehop_restaurant_app.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String order_itemID;

    @Column(name = "item_category")
    private String item_category;

    @Column(name = "order_quantity")
    private String order_quantity;

    @Column(name = "order_remark")
    private String order_remark;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "item_price")
    private String item_price;

    @Column(name = "orderID")
    private String orderID;

    @Column(name = "itemID")
    private String itemID;

    public String getOrder_itemID() {
        return this.order_itemID;
    }

    public void setOrder_itemID(String order_itemID) {
        this.order_itemID = order_itemID;
    }

    public String getItem_category() {
        return this.item_category;
    }

    public void setItem_category(String item_category) {
        this.item_category = item_category;
    }

    public String getOrder_quantity() {
        return this.order_quantity;
    }

    public void setOrder_quantity(String order_quantity) {
        this.order_quantity = order_quantity;
    }

    public String getOrder_remark() {
        return this.order_remark;
    }

    public void setOrder_remark(String order_remark) {
        this.order_remark = order_remark;
    }

    public String getItem_name() {
        return this.item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getItem_price() {
        return this.item_price;
    }

    public void setItem_price(String item_price) {
        this.item_price = item_price;
    }

    public String getOrderID() {
        return this.orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getItemID() {
        return this.itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    @Override
    public String toString() {
        return "{" +
                " order_itemID='" + getOrder_itemID() + "'" +
                ", item_category='" + getItem_category() + "'" +
                ", order_quantity='" + getOrder_quantity() + "'" +
                ", order_remark='" + getOrder_remark() + "'" +
                ", item_name='" + getItem_name() + "'" +
                ", item_price='" + getItem_price() + "'" +
                ", orderID='" + getOrderID() + "'" +
                ", itemID='" + getItemID() + "'" +
                "}";
    }

}
