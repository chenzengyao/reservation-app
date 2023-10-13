package com.tablehop.tablehop_restaurant_app.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tablehop.tablehop_restaurant_app.entity.User;

import java.util.List;

@Repository
public interface userRepository extends JpaRepository<User, Integer> {

//    @Modifying(clearAutomatically = true)
//    @Transactional
//    @Query(value="update user set address = ?2 WHERE user_id = ?1", nativeQuery=true)
//    public void updateAddress(String userID, String address);

    @Query(value="SELECT * from user WHERE email = ?1", nativeQuery=true)
    public User checkExistEmail(String email);

    @Query(value="SELECT * from user WHERE email = ?1 AND password = ?2", nativeQuery=true)
    public User checkExistUser(String email, String password);

    @Query(value="SELECT * from user WHERE email = ?1 AND password = ?2", nativeQuery=true)
    public User checkCurrentPassword(String email, String current_password);

    @Query(value="SELECT * from user WHERE email = ?1", nativeQuery=true)
    public User getUserProfile(String email);

    @Query(value="SELECT * FROM user ORDER BY user_type;", nativeQuery=true)
    public List<User> getAllUser();

    @Query(value="SELECT * FROM user WHERE username like %:name%", nativeQuery=true)
    public List<User> getCustomerByName(String name);

}
