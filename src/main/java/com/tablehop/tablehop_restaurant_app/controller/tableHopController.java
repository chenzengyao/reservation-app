package com.tablehop.tablehop_restaurant_app.controller;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.cloudinary.utils.ObjectUtils;
import com.tablehop.tablehop_restaurant_app.entity.*;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tablehop.tablehop_restaurant_app.service.tableHopService;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.*;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class tableHopController {
    private static final Logger log = LoggerFactory.getLogger(tableHopController.class);

    @Autowired
    public tableHopService tableHopService;

    @Value("${image.upload.directory}")
    private String uploadDirectory;

    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "hx1dfduy4",
            "api_key", "181671934764155",
            "api_secret", "W0O9YLH6yr63xZ1fs2Zs7q_WmX4"
    ));

    @RequestMapping(value = "/users/register", method = RequestMethod.POST)
    public void register(@RequestParam String username, @RequestParam String email, @RequestParam String phone_no, @RequestParam String password, @RequestParam String dob) {
        log.info("users register -----> controller");
        tableHopService.register(username, email, phone_no, password, dob);
    }

    @RequestMapping(value = "/admin/users/add/register", method = RequestMethod.POST)
    public void adminRegister(@RequestParam String username, @RequestParam String email, @RequestParam String phone_no, @RequestParam String dob, @RequestParam String role, @RequestParam String user_access_type) {
        log.info("admin register -----> controller");
        tableHopService.adminRegister(username, email, phone_no, dob, role, user_access_type);
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

    @RequestMapping(value = "/users/resetPassword", method = RequestMethod.POST)
    public void updateNewPassword(@RequestParam String email) {
        log.info("users resetPassword -----> controller");
        tableHopService.resetPassword(email);
    }

    @RequestMapping(value = "/user/profile", method = RequestMethod.GET)
    public User getUserProfile(@RequestParam String email) {
        log.info("user getUserProfile -----> controller");
        return tableHopService.getUserProfile(email);
    }

    @RequestMapping(value = "/users/useraccesstype", method = RequestMethod.GET)
    public int getUserAccessType(@RequestParam String email) {
        log.info("user getUserType -----> controller");
        return tableHopService.getUserAccessType(email);
    }

    @RequestMapping(value = "/user/reservation/add", method = RequestMethod.POST)
    public void addReservation(@RequestParam Number pax_no, @RequestParam String reservation_dt, @RequestParam String reserve_status,
                        @RequestParam String reserve_remark, @RequestParam String reserve_created_dt,@RequestParam String userID,
                        @RequestParam String tableID) {
        log.info("admin add menu -----> controller");
//        tableHopService.addMenu(pax_no, reservation_dt, reserve_status, reserve_remark, reserve_created_dt, userID, tableID);
    }

    @RequestMapping(value = "/admin/getAllMenu", method = RequestMethod.GET)
    public List<Item> getAllMenu() {
        log.info("admin getAllMenu -----> controller");
        return tableHopService.getAllMenu();
    }

    @RequestMapping(value = "/user/getAllMenu", method = RequestMethod.GET)
    public List<Item> getAllMenuUser() {
        log.info("user getAllMenu -----> controller");
        return tableHopService.getAllMenuUser();
    }

    @RequestMapping(value = "/admin/menu/addMenu", method = RequestMethod.POST)
    public ResponseEntity<String> addMenu( @RequestParam("item_category") String itemCategory,
                                           @RequestParam("item_name") String itemName,
                                           @RequestParam("item_description") String itemDescription,
                                           @RequestParam("item_price") String itemPrice,
                                           @RequestParam("item_remark") String itemRemark,
                                           @RequestParam("item_status") String itemStatus,
                                           @RequestParam("image") MultipartFile image) throws IOException {
        String originalFilename = image.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));

        String uniqueFileName = UUID.randomUUID().toString();
                //+ fileExtension;
        String publicId = "assests/images/" + uniqueFileName;

        Map<String, Object> options = ObjectUtils.asMap("public_id", publicId);
        Map<?, ?> uploadResult = cloudinary.uploader().upload(image.getBytes(), options);
//        String projectRoot = System.getProperty("user.dir"); // Get the project root directory
//        String fullUploadDirectory = projectRoot + File.separator + uploadDirectory;
//
//        File directory = new File(fullUploadDirectory);
//        if (!directory.exists()) {
//            directory.mkdirs();
//        }
//        // Save the file to the specified directory
//        String filePath = fullUploadDirectory + File.separator + uniqueFileName;
//        image.transferTo(new File(filePath));
        Date itemCreatedDt = new Date();
        Timestamp currentTimestamp = new Timestamp(itemCreatedDt.getTime());

        tableHopService.addMenu(itemCategory, itemName, itemDescription, itemPrice, itemRemark, itemStatus, itemCreatedDt, "Admin", uniqueFileName);
        return ResponseEntity.ok("Product created successfully.");
    }

    @RequestMapping(value = "/admin/menu/modifyMenu", method = RequestMethod.POST)
    public ResponseEntity<String> modifyMenu(@RequestParam("item_id") String itemID,
                                           @RequestParam("item_category") String itemCategory,
                                           @RequestParam("item_name") String itemName,
                                           @RequestParam("item_description") String itemDescription,
                                           @RequestParam("item_price") String itemPrice,
                                           @RequestParam("item_remark") String itemRemark,
                                           @RequestParam("item_status") String itemStatus,
                                           @RequestParam(name = "image", required = false) String image,
                                           @RequestParam(name = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        Date itemCreatedDt = new Date();
        Timestamp currentTimestamp = new Timestamp(itemCreatedDt.getTime());

        if(image.equals("null")){
            String originalFilename = imageFile.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));

            String uniqueFileName = UUID.randomUUID().toString();
            //+ fileExtension;
            String publicId = "assests/images/" + uniqueFileName;

            Map<String, Object> options = ObjectUtils.asMap("public_id", publicId);
            Map<?, ?> uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), options);

            tableHopService.modifyMenu(itemID, itemCategory, itemName, itemDescription, itemPrice, itemRemark, itemStatus, itemCreatedDt, "Admin", uniqueFileName);
        } else {
            tableHopService.modifyMenu(itemID, itemCategory, itemName, itemDescription, itemPrice, itemRemark, itemStatus, itemCreatedDt, "Admin", image);
        }

        return ResponseEntity.ok("Product created successfully.");
    }

    @RequestMapping(value = "/admin/reservation/all", method = RequestMethod.POST)
    public Map<String, Object> adminGetReservation() {
        log.info("admin get reservation -----> controller");
        return tableHopService.adminGetReservations();
    }

    @RequestMapping(value = "/user/reservation/addReservation", method = RequestMethod.POST)
    public ResponseEntity<String> addReservation( @RequestParam("pax_no") int pax_no,
                                           @RequestParam("reservation_dt") String reservation_dt,
                                           @RequestParam("reserve_status") String reserve_status,
                                           @RequestParam("reserve_remark") String reserve_remark,
                                           @RequestParam("reserve_created_dt") String reserve_created_dt,
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

    @RequestMapping(value = "/admin/reservation/addReservation", method = RequestMethod.POST)
    public ResponseEntity<Object> adminAddReservation(@RequestBody Map<String, Object> payload) {
        log.info("admin add reservation -----> controller");
        // log.info("controller data: {}", payload.values().stream().filter((x) -> x instanceof Reservation).findFirst().get());
        Object result = tableHopService.adminSaveReservation(payload);
        log.info("Result ----> {} ",result);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/user/edituserprofile", method = RequestMethod.POST)
    public void editUserProfile(@RequestBody User userProfile) {
        log.info("edit user profile -----> controller");
        log.info(userProfile.toString());
        // log.info("controller data: {}", payload.values().stream().filter((x) -> x instanceof Reservation).findFirst().get());
        tableHopService.editUserProfile(userProfile);

    }

    @RequestMapping(value = "/admin/reservation/updateReservation", method = RequestMethod.POST)
    public ResponseEntity<Object> adminUpdateReservation(@RequestBody Map<String, Object> payload) {
        log.info("admin update reservation -----> controller");
        Object result = tableHopService.adminUpdateReservation(payload);
        log.info("Result ----> {} ",result);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/user/addOrder", method = RequestMethod.POST)
    public ResponseEntity<Object> addOrder(@RequestBody Map<String, Object> payload) {
        log.info("admin add reservation -----> controller");
        // log.info("controller data: {}", payload.values().stream().filter((x) -> x instanceof Reservation).findFirst().get());
        Object result = tableHopService.userAddOrder(payload);
        log.info("Result ----> {} ",result);
        return ResponseEntity.ok(result);
    }

    // admin get tables
    @RequestMapping(value = "/admin/table/all", method = RequestMethod.GET)
    public ResponseEntity<Object> adminGetTables() {
        log.info("admin get tables -----> controller");
        return ResponseEntity.ok(tableHopService.adminGetTables());
    }

    // admin create table
    @RequestMapping(value = "/admin/table/addTable", method = RequestMethod.POST)
    public ResponseEntity<Object> adminAddTable(@RequestBody Tables payload) {
        log.info("admin add table -----> controller");
        Object result = tableHopService.adminAddTable(payload);
        log.info("Result ----> {} ",result);
        return ResponseEntity.ok(result);
    }

    // admin update table position
    @RequestMapping(value = "/admin/table/updateTablePosition", method = RequestMethod.POST)
    public ResponseEntity<String[]> adminUpdateTablePosition(@RequestBody Tables payload) {
        log.info("admin update table position -----> controller");
        tableHopService.adminUpdateTablePosition(payload);
        String[] result = { "result" };
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/admin/getAllUser", method = RequestMethod.GET)
    public List<User> getAllUser() {
        log.info("admin get all user -----> controller");
        return tableHopService.getAllUser();
    }

    @RequestMapping(value = "/admin/deleteUser", method = RequestMethod.POST)
    public void deleteUser(@RequestParam String userID) {
        log.info("admin delete user -----> controller");
        tableHopService.deleteUser(userID);
    }

    @RequestMapping(value = "/user/getOrder", method = RequestMethod.GET)
    public List<Map<String, Object>> getOrder(@RequestParam String email) {
        log.info("user get order -----> controller");
        return tableHopService.getOrder(email);
    }

    @RequestMapping(value = "/user/menu/getImage", method = RequestMethod.GET)
    public String getImage(@RequestParam int itemID) {
        log.info("user get Image -----> controller");
        return tableHopService.getImage(itemID);
    }

    @RequestMapping(value = "/admin/user/getUserByName", method = RequestMethod.GET)
    public List<User> getUserByName(@RequestParam String userName) {
        log.info("admin get user by name -----> controller");
        return tableHopService.getUserByName(userName);
    }

    @RequestMapping(value = "/admin/deliveryMan/all", method = RequestMethod.GET)
    public List<DeliveryMan> adminGetDeliveryMan() {
        return tableHopService.adminGetDeliveryMan();
    }

    @RequestMapping(value = "/admin/deliveryMan/add", method = RequestMethod.POST)
    public List<DeliveryMan> adminSaveDeliveryMan(@RequestBody String phone) {
        log.info("admin save delivery mane {}", phone);
        return tableHopService.adminSaveDeliveryMan(phone);
    }

}
