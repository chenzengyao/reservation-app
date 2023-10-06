package com.tablehop.tablehop_restaurant_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tablehop.tablehop_restaurant_app.entity.Tables;

public interface tableRepository extends JpaRepository<Tables, Integer> {

}
