package com.tablehop.tablehop_restaurant_app.controller;

import java.util.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tablehop.tablehop_restaurant_app.service.tableHopService;
import com.tablehop.tablehop_restaurant_app.entity.User;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class tableHopController {
    private static final Logger log = LoggerFactory.getLogger(tableHopController.class);

    @Autowired
    public tableHopService tableHopService;

    @RequestMapping(value = "/users/checkExistEmail", method = RequestMethod.GET)
    public int checkExistEmail(@RequestParam String email) {
        log.info("checkExistEmail -----> controller");
        return tableHopService.checkExistEmail(email);
    }

    @RequestMapping(value = "/users/register", method = RequestMethod.POST)
    public void register(@RequestParam String username, @RequestParam String email, @RequestParam String phone_no, @RequestParam String password, @RequestParam String dob) {
        log.info("users register -----> controller");
        tableHopService.register(username, email, phone_no, password, dob);
    }

    @RequestMapping(value = "/users/getDetails", method = RequestMethod.GET)
    public User getDetails(@RequestParam String email) {
        log.info("getDetails -----> controller");
        return tableHopService.getUserDetail(email);
    }

}
