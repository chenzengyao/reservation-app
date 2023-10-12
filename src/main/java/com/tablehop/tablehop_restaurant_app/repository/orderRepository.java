package com.tablehop.tablehop_restaurant_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tablehop.tablehop_restaurant_app.entity.Orders;
import org.springframework.data.jpa.repository.Query;

public interface orderRepository extends JpaRepository<Orders, Integer>{
    
    public Orders findByReservationID(Integer reservationId);

    @Query(value="SELECT * FROM orders where userID = ?1 ORDER BY order_created_dt DESC", nativeQuery=true)
    public List<Orders> findOrdersByUserID(Integer userID);

    @Query(value="SELECT * FROM orders where userID = ?1;", nativeQuery=true)
    public List<Orders> getOrderByUserID(String userID);
}
