package com.tablehop.tablehop_restaurant_app.service;

import com.tablehop.tablehop_restaurant_app.controller.tableHopController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.tablehop.tablehop_restaurant_app.entity.User;
import com.tablehop.tablehop_restaurant_app.repository.userRepository;
import jakarta.annotation.Resource;
import java.util.Objects;

@Service
public class tableHopService {

    private static final Logger log = LoggerFactory.getLogger(tableHopController.class);

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
        //find by email
        return userRepository.checkExistEmail(email);
    }

    public int checkExistUser(String email, String password) {
        User loginUser = userRepository.checkExistUser(email, password);
        if(Objects.isNull(loginUser)){
            return 0;
        } else {
            return 1;
        }
    }

    public int checkCurrentPassword(String email, String current_password) {
        User CheckcurrentPassword = userRepository.checkCurrentPassword(email, current_password);
        if(Objects.isNull(CheckcurrentPassword)){
            return 0;
        } else {
            return 1;
        }
    }

    public void updateNewPassword(String email, String new_password) {
        log.warn(new_password);
        User set_new_password = userRepository.checkExistEmail(email);
        set_new_password.setPassword(new_password);
        userRepository.saveAndFlush(set_new_password);
    }

}
