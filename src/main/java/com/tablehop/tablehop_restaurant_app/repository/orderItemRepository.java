package com.tablehop.tablehop_restaurant_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tablehop.tablehop_restaurant_app.entity.OrderItem;

public interface orderItemRepository extends JpaRepository<OrderItem, Integer>{
    
    public List<OrderItem> findByOrderID(Integer orderId);
}
