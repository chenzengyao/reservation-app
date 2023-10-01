package com.tablehop.tablehop_restaurant_app.service;

import org.springframework.stereotype.Service;
import com.tablehop.tablehop_restaurant_app.entity.User;
import com.tablehop.tablehop_restaurant_app.repository.userRepository;
import jakarta.annotation.Resource;
import java.util.Objects;

@Service
public class tableHopService {



    @Resource
    private userRepository userRepository;

    public void register(String username, String email, String phone_no, String password, String dob) {
        //Init
        User user = new User();
        user.setUserName(username);
        user.setEmail(email);
        user.setPhone_no(phone_no);
        user.setPassword(password);
//        user.setDob(dob);
        user.setUser_type("user");
        user.setUser_access_type("1");
        userRepository.saveAndFlush(user);
    }

    public int checkExistEmail(String email) {
        User existingUser = userRepository.checkExistEmail(email);
        if(Objects.isNull(existingUser)){
            return 0;
        } else {
            return 1;
        }
    }

    public User getUserDetail(String email) {
        return userRepository.checkExistEmail(email);
    }
}
