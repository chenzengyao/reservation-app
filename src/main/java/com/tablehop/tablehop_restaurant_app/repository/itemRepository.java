package com.tablehop.tablehop_restaurant_app.repository;

import com.tablehop.tablehop_restaurant_app.entity.Item;
import com.tablehop.tablehop_restaurant_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface itemRepository extends JpaRepository<Item, Integer> {

}
