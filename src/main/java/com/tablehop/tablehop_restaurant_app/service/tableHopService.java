package com.tablehop.tablehop_restaurant_app.service;

import org.springframework.stereotype.Service;
import com.tablehop.tablehop_restaurant_app.entity.User;
import com.tablehop.tablehop_restaurant_app.entity.Item;
import com.tablehop.tablehop_restaurant_app.repository.userRepository;
import com.tablehop.tablehop_restaurant_app.repository.itemRepository;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Objects;

@Service
public class tableHopService {

    @Resource
    private userRepository userRepository;

    @Resource
    private itemRepository itemRepository;

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

    public void addMenu(String item_category, String item_name, String item_description,
                        String item_price, String item_remark, String item_status,
                        String item_image, String item_created_dt, String created_by) {
        //Init
        Item menu = new Item();
        menu.setItem_category(item_category);
        menu.setItem_name(item_name);
        menu.setItem_price(item_price);
        menu.setItem_description(item_description);
        menu.setItem_remark(item_remark);
        menu.setItem_status(item_status);
        menu.setItem_image(item_image);
        menu.setItem_created_dt(item_created_dt);
        menu.setCreated_by(created_by);
        itemRepository.saveAndFlush(menu);
    }
}
