package com.tablehop.tablehop_restaurant_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tablehop.tablehop_restaurant_app.entity.OrderItem;

public interface orderItemRepository extends JpaRepository<OrderItem, Integer>{
    
}
