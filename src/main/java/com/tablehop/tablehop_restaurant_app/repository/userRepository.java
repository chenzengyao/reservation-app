package com.tablehop.tablehop_restaurant_app.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tablehop.tablehop_restaurant_app.entity.User;

@Repository
public interface userRepository extends JpaRepository<User, Integer> {

//    @Modifying(clearAutomatically = true)
//    @Transactional
//    @Query(value="update user set address = ?2 WHERE user_id = ?1", nativeQuery=true)
//    public void updateAddress(String userID, String address);

    @Query(value="SELECT * from user WHERE email = ?1", nativeQuery=true)
    public User checkExistEmail(String email);



}
