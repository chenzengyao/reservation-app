package com.tablehop.tablehop_restaurant_app.DTO;

import org.springframework.boot.autoconfigure.web.WebProperties;
import java.util.Date;
import javax.persistence.*;

public class orderItemDTO {

    public String getOrder_itemID() {
        return order_itemID;
    }

    public void setOrder_itemID(String order_itemID) {
        this.order_itemID = order_itemID;
    }

    public String getItem_category() {
        return item_category;
    }

    public void setItem_category(String item_category) {
        this.item_category = item_category;
    }

    public String getOrder_quantity() {
        return order_quantity;
    }

    public void setOrder_quantity(String order_quantity) {
        this.order_quantity = order_quantity;
    }

    public String getOrder_remark() {
        return order_remark;
    }

    public void setOrder_remark(String order_remark) {
        this.order_remark = order_remark;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getItem_price() {
        return item_price;
    }

    public void setItem_price(String item_price) {
        this.item_price = item_price;
    }

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    @Override
    public String toString() {
        return "orderItemDTO{" +
                "order_itemID='" + order_itemID + '\'' +
                ", item_category='" + item_category + '\'' +
                ", order_quantity='" + order_quantity + '\'' +
                ", order_remark='" + order_remark + '\'' +
                ", item_name='" + item_name + '\'' +
                ", item_price='" + item_price + '\'' +
                ", orderID='" + orderID + '\'' +
                ", itemID='" + itemID + '\'' +
                '}';
    }

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


}
