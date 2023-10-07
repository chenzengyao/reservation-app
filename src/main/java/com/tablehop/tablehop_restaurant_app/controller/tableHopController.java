package com.tablehop.tablehop_restaurant_app.controller;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

import com.tablehop.tablehop_restaurant_app.entity.Item;
import com.tablehop.tablehop_restaurant_app.entity.Reservation;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tablehop.tablehop_restaurant_app.service.tableHopService;
import com.tablehop.tablehop_restaurant_app.entity.User;
import org.springframework.web.multipart.MultipartFile;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class tableHopController {
    private static final Logger log = LoggerFactory.getLogger(tableHopController.class);

    @Autowired
    public tableHopService tableHopService;

    @RequestMapping(value = "/users/register", method = RequestMethod.POST)
    public void register(@RequestParam String username, @RequestParam String email, @RequestParam String phone_no, @RequestParam String password, @RequestParam String dob) {
        log.info("users register -----> controller");
        tableHopService.register(username, email, phone_no, password, dob);

    }

    @RequestMapping(value = "/users/checkExistEmail", method = RequestMethod.GET)
    public int checkExistEmail(@RequestParam String email) {
        log.info("checkExistEmail -----> controller");
        return tableHopService.checkExistEmail(email);
    }

    @RequestMapping(value = "/admin/menu/add", method = RequestMethod.POST)
    public void addMenu(@RequestParam String item_category, @RequestParam String item_name, @RequestParam String item_description,
                        @RequestParam String item_price, @RequestParam String item_remark,@RequestParam String item_status,
                        @RequestParam String item_created_dt, @RequestParam String created_by) {
        log.info("admin add menu -----> controller");
//        tableHopService.addMenu(item_category, item_name, item_description, item_price, item_remark, item_status, item_created_dt, created_by);
    }

    @RequestMapping(value = "/users/getDetails", method = RequestMethod.GET)
    public User getDetails(@RequestParam String email) {
        log.info("getDetails -----> controller");
        return tableHopService.getUserDetail(email);
    }

    @RequestMapping(value = "/users/checkExistUser", method = RequestMethod.GET)
    public int checkExistUser(@RequestParam String email, @RequestParam String password) {
        log.info("checkExistUser -----> controller");
        return tableHopService.checkExistUser(email, password);
    }

    @RequestMapping(value = "/users/checkCurrentPassword", method = RequestMethod.GET)
    public int checkCurrentPassword(@RequestParam String email, @RequestParam String current_password) {
        log.info("checkCurrentPassword -----> controller");
        return tableHopService.checkCurrentPassword(email, current_password);
    }

    @RequestMapping(value = "/users/UpdateNewPassword", method = RequestMethod.POST)
    public void updateNewPassword(@RequestParam String email, @RequestParam String new_password) {
        log.info("users UpdateNewPassword -----> controller");
        tableHopService.updateNewPassword(email, new_password);
    }

//    @RequestMapping(value = "/user/reservation/add", method = RequestMethod.POST)
//    public void addReservation(@RequestParam Number pax_no, @RequestParam String reservation_dt, @RequestParam String reserve_status,
//                        @RequestParam String reserve_remark, @RequestParam String reserve_created_dt,@RequestParam String userID,
//                        @RequestParam String tableID) {
//        log.info("admin add menu -----> controller");
////        tableHopService.addMenu(pax_no, reservation_dt, reserve_status, reserve_remark, reserve_created_dt, userID, tableID);
//    }

    @RequestMapping(value = "/admin/getAllMenu", method = RequestMethod.GET)
    public List<Item> updateNewPassword() {
        log.info("admin getAllMenu -----> controller");
        return tableHopService.getAllMenu();
    }

    @RequestMapping(value = "/admin/menu/addMenu", method = RequestMethod.POST)
    public ResponseEntity<String> addMenu( @RequestParam("item_category") String itemCategory,
                                           @RequestParam("item_name") String itemName,
                                           @RequestParam("item_description") String itemDescription,
                                           @RequestParam("item_price") String itemPrice,
                                           @RequestParam("item_remark") String itemRemark,
                                           @RequestParam("item_status") String itemStatus,
                                           @RequestParam("item_created_dt") String itemCreatedDt,
                                           @RequestParam("image") MultipartFile image) throws IOException {
        String imagePath = tableHopService.saveImageToStorage(image);
        tableHopService.addMenu(itemCategory, itemName, itemDescription, itemPrice, itemRemark, itemStatus, itemCreatedDt, "Admin", imagePath);
        return ResponseEntity.ok("Product created successfully.");
    }

    @RequestMapping(value = "/admin/reservation/all", method = RequestMethod.POST)
    public Map<String, Object> adminGetReservation() {
        log.info("admin get reservation -----> controller");
        return tableHopService.adminGetReservations();
    }

    @RequestMapping(value = "/admin/reservation/all", method = RequestMethod.POST)
    public Map<String, Object> adminGetReservation() {
        log.info("admin get reservation -----> controller");
        return tableHopService.adminGetReservations();
    }

    @RequestMapping(value = "/user/reservation/addReservation", method = RequestMethod.POST)
    public ResponseEntity<String> addReservation( @RequestParam("pax_no") int pax_no,
                                           @RequestParam("reservation_dt") Timestamp reservation_dt,
                                           @RequestParam("reserve_status") String reserve_status,
                                           @RequestParam("reserve_remark") String reserve_remark,
                                           @RequestParam("reserve_created_dt") Timestamp reserve_created_dt,
                                           @RequestParam("userID") int userID,
                                           @RequestParam("tableID") int tableID) throws IOException {
        tableHopService.addReservation(pax_no, reservation_dt, reserve_status, reserve_remark, reserve_created_dt, userID, tableID);
        return ResponseEntity.ok("Table reserved successfully.");
    }

    // get reservation by id
    @RequestMapping(value = "/admin/reservation/getReservationByID", method = RequestMethod.GET)
    public ResponseEntity<Object> adminGetReservationById(@RequestParam Integer reservationID) {
        log.info("admin get reservation by id -----> controller");
        return ResponseEntity.ok(tableHopService.adminGetOrdersById(reservationID));
    }

    // get reservation by id
    @RequestMapping(value = "/admin/reservation/getReservationByID", method = RequestMethod.GET)
    public ResponseEntity<Object> adminGetReservationById(@RequestParam Integer reservationID) {
        log.info("admin get reservation by id -----> controller");
        return ResponseEntity.ok(tableHopService.adminGetOrdersById(reservationID));
    }

    @RequestMapping(value = "/admin/reservation/addReservation", method = RequestMethod.POST)
    public ResponseEntity<Object> adminAddReservation(@RequestBody Map<String, Object> payload) {
        log.info("admin add reservation -----> controller");
        // log.info("controller data: {}", payload.values().stream().filter((x) -> x instanceof Reservation).findFirst().get());
        Object result = tableHopService.adminSaveReservation(payload);
        log.info("Result ----> {} ",result);
    }
}
