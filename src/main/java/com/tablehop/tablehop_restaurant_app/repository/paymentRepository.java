package com.tablehop.tablehop_restaurant_app.repository;

import com.tablehop.tablehop_restaurant_app.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface paymentRepository extends JpaRepository<Payment, Integer> {
}

