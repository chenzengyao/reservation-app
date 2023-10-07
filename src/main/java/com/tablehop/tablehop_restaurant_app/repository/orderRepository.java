package com.tablehop.tablehop_restaurant_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tablehop.tablehop_restaurant_app.entity.Order;

public interface orderRepository extends JpaRepository<Order, Integer>{
    
    public Order findByReservationID(Integer reservationId);
}
