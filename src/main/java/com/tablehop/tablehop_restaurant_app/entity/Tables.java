package com.tablehop.tablehop_restaurant_app.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tables")
public class Tables {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tableID;

    @Column(name = "table_size")
    private String table_size;

    @Column(name = "table_status")
    private String table_status;

    @Column(name = "table_created_dt")
    private Date table_created_dt;

    @Column(name = "table_updated_dt")
    private Date table_updated_dt;

    @Column(name = "table_modified_by")
    private String table_modified_by;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "arranged_by")
    private String arranged_by;

    @Column(name = "userID")
    private String userID;

    public Integer getTableID() {
        return this.tableID;
    }

    public void setTableID(Integer tableID) {
        this.tableID = tableID;
    }

    public String getTable_size() {
        return this.table_size;
    }

    public void setTable_size(String table_size) {
        this.table_size = table_size;
    }

    public String getTable_status() {
        return this.table_status;
    }

    public void setTable_status(String table_status) {
        this.table_status = table_status;
    }

    public Date getTable_created_dt() {
        return this.table_created_dt;
    }

    public void setTable_created_dt(Date table_created_dt) {
        this.table_created_dt = table_created_dt;
    }

    public Date getTable_updated_dt() {
        return this.table_updated_dt;
    }

    public void setTable_updated_dt(Date table_updated_dt) {
        this.table_updated_dt = table_updated_dt;
    }

    public String getTable_modified_by() {
        return this.table_modified_by;
    }

    public void setTable_modified_by(String table_modified_by) {
        this.table_modified_by = table_modified_by;
    }

    public String getCreated_by() {
        return this.created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getArranged_by() {
        return this.arranged_by;
    }

    public void setArranged_by(String arranged_by) {
        this.arranged_by = arranged_by;
    }

    public String getUserID() {
        return this.userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    @Override
    public String toString() {
        return "{" +
                " tableID='" + getTableID() + "'" +
                ", table_size='" + getTable_size() + "'" +
                ", table_status='" + getTable_status() + "'" +
                ", table_created_dt='" + getTable_created_dt() + "'" +
                ", table_updated_dt='" + getTable_updated_dt() + "'" +
                ", table_modified_by='" + getTable_modified_by() + "'" +
                ", created_by='" + getCreated_by() + "'" +
                ", arranged_by='" + getArranged_by() + "'" +
                ", userID='" + getUserID() + "'" +
                "}";
    }

}
