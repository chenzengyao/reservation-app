package com.tablehop.tablehop_restaurant_app.service;

import com.tablehop.tablehop_restaurant_app.controller.tableHopController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.tablehop.tablehop_restaurant_app.entity.User;
import com.tablehop.tablehop_restaurant_app.entity.Delivery;
import com.tablehop.tablehop_restaurant_app.entity.Item;
import com.tablehop.tablehop_restaurant_app.entity.Order;
import com.tablehop.tablehop_restaurant_app.entity.OrderItem;
import com.tablehop.tablehop_restaurant_app.entity.Reservation;
import com.tablehop.tablehop_restaurant_app.entity.Tables;
import com.tablehop.tablehop_restaurant_app.repository.userRepository;
import com.tablehop.tablehop_restaurant_app.repository.itemRepository;
import com.tablehop.tablehop_restaurant_app.repository.orderItemRepository;
import com.tablehop.tablehop_restaurant_app.repository.orderRepository;
import com.tablehop.tablehop_restaurant_app.repository.reservationRepository;
import com.tablehop.tablehop_restaurant_app.repository.tableRepository;
import com.tablehop.tablehop_restaurant_app.repository.deliveryRepository;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
public class tableHopService {

    private static final Logger log = LoggerFactory.getLogger(tableHopController.class);

    @Resource
    private userRepository userRepository;

    @Resource
    private itemRepository itemRepository;

    @Resource
    private reservationRepository reservationRepository;

    @Resource
    private orderRepository orderRepository;

    @Resource
    private orderItemRepository orderItemRepository;

    @Resource
    private tableRepository tableRepository;

    @Resource
    private deliveryRepository deliveryRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${image.upload.directory}")
    private String imageUploadDirectory;

    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "@$!%*#?&^_-";
    private static final SecureRandom random = new SecureRandom();

    public void register(String username, String email, String phone_no, String password, String dob) {
        // Init
        User user = new User();
        user.setUserName(username);
        user.setEmail(email);
        user.setPhone_no(phone_no);
        user.setPassword(password);
        user.setDob(dob);
        user.setUser_type("Member");
        user.setUser_access_type("1");
        userRepository.saveAndFlush(user);
    }

    public void adminRegister(String username, String email, String phone_no, String dob, String role, String user_access_type) {
        String temporaryPassword = generatePassword(8);
        // Init
        User user = new User();
        user.setUserName(username);
        user.setEmail(email);
        user.setPassword(temporaryPassword);
        user.setPhone_no(phone_no);
        user.setDob(dob);
        user.setUser_type(role);
        user.setUser_access_type(user_access_type);
        userRepository.saveAndFlush(user);

        String subject = "Welcome to TableHop - Your Account Information\n\n";
        String body = "Dear " + username + ",\n\n"
                + "We are thrilled to welcome you to TableHop, your go-to restaurant app for discovering amazing dining experiences! Thank you for choosing us to enhance your culinary journey.\n\n"
                + "To get started, here are your login credentials:\n\n"
                + "Username: " + email + "\n"
                + "Temporary Password: " + temporaryPassword + "\n\n"
                + "For security reasons, we've provided you with a temporary password. We strongly recommend that you change your password after your first login. To do so, please follow these simple steps:\n\n"
                + "1. Login to the TableHop app on your device.\n"
                + "2. Click on the \"Login\" button.\n"
                + "3. Enter your email address and the temporary password provided above.\n"
                + "4. Once logged in, go to your profile settings.\n"
                + "5. Select \"Change Password\" and follow the prompts to set your own secure password.\n\n"
                + "Your account security is essential to us, and we encourage you to choose a strong password that is unique to TableHop. It should include a combination of uppercase and lowercase letters, numbers, and special characters.\n\n"
                + "TableHop offers an array of features to make your dining experience unforgettable, such as browsing restaurants, making reservations, and discovering exclusive deals. Explore and savor the finest cuisine your city has to offer.\n\n"
                + "If you have any questions, concerns, or need assistance with anything related to TableHop, please do not hesitate to contact our customer support team at tablehopSG@gmail.com.\n\n"
                + "Thank you for choosing TableHop. We look forward to serving you a delightful dining experience!\n\n"
                + "Best Regards,\n\n"
                + "TableHop Customer Support Team\n";

        sendEmail(email, subject, body);
    }

    public int checkExistEmail(String email) {
        User existingUser = userRepository.checkExistEmail(email);
        if (Objects.isNull(existingUser)) {
            return 0;
        } else {
            return 1;
        }
    }

    public User getUserDetail(String email) {
        // find by email
        return userRepository.checkExistEmail(email);
    }

    public void addMenu(String item_category, String item_name, String item_description,
            String item_price, String item_remark, String item_status,
            Date item_created_dt, String created_by, String image) {
        // Init
        Item menu = new Item();
        menu.setItem_category(item_category);
        menu.setItem_name(item_name);
        menu.setItem_price(item_price);
        menu.setItem_description(item_description);
        menu.setItem_remark(item_remark);
        menu.setItem_status(item_status);
        menu.setItem_created_dt(item_created_dt);
        menu.setCreated_by(created_by);
        menu.setItem_image(image);
        itemRepository.saveAndFlush(menu);
    }

    public void modifyMenu(String itemID, String item_category, String item_name, String item_description,
                        String item_price, String item_remark, String item_status,
                        Date item_created_dt, String created_by, String image) {
        // Init
        Item menu = itemRepository.getItemByID(itemID);
        menu.setItem_category(item_category);
        menu.setItem_name(item_name);
        menu.setItem_price(item_price);
        menu.setItem_description(item_description);
        menu.setItem_remark(item_remark);
        menu.setItem_status(item_status);
        menu.setItem_updated_dt(item_created_dt);
        menu.setUpdated_by(created_by);
        menu.setItem_image(image);
        itemRepository.saveAndFlush(menu);
    }

    public int checkExistUser(String email, String password) {
        User loginUser = userRepository.checkExistUser(email, password);
        if (Objects.isNull(loginUser)) {
            return 0;
        } else {
            return 1;
        }
    }

    public int checkCurrentPassword(String email, String current_password) {
        User CheckcurrentPassword = userRepository.checkCurrentPassword(email, current_password);
        if (Objects.isNull(CheckcurrentPassword)) {
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

    public void resetPassword(String email) {
        User user = userRepository.checkExistEmail(email);
        if(Objects.isNull(user)){
            return;
        }
        String temporaryPassword = generatePassword(8);
        user.setPassword(temporaryPassword);

        String subject = "TableHop Restaurant App - Password Reset";
        String body = "Dear " + user.getUserName() + ",\n\n"
                + "We hope this message finds you well. It appears that you have requested to reset your password for your TableHop Restaurant App account. Your security is important to us, and we are here to assist you in this process.\n\n"
                + "To complete the password reset, please use the following temporary password:\n\n"
                + "Temporary Password: " + temporaryPassword + "\n\n"
                + "**Please note:** This temporary password is valid for a limited time and is for a single use only. We recommend that you reset your password as soon as possible to maintain the security of your account.\n\n"
                + "To reset your password, please follow these steps:\n\n"
                + "1. Open the TableHop Restaurant App on your device.\n"
                + "2. Enter your email address and the temporary password provided above.\n"
                + "3. Click on the \"Login\" button.\n"
                + "4. Once logged in, go to your profile settings.\n"
                + "5. Select \"Change Password\" and follow the prompts to set your own secure password.\n\n"
                + "Your account security is essential to us, and we encourage you to choose a strong password that is unique to TableHop. It should include a combination of uppercase and lowercase letters, numbers, and special characters.\n\n"
                + "Once you have successfully reset your password, you will be able to access your TableHop Restaurant App account with your new credentials.\n\n"
                + "If you did not request this password reset or have any concerns about the security of your account, please contact our support team immediately at tablehopSG@gmail.com.\n\n"
                + "Thank you for choosing TableHop for your restaurant dining experience. We apologize for any inconvenience this password reset may have caused and appreciate your cooperation in maintaining the security of your account.\n\n"
                + "Best Regards,\n\n"
                + "TableHop Customer Support Team\n";
        sendEmail(email, subject, body);
        userRepository.saveAndFlush(user);
    }

    public List<Item> getAllMenu() {
        List<Item> itemList = itemRepository.findAll();
        return itemList;
    }

    public List<Item> getAllMenuUser() {
        List<Item> itemList = itemRepository.findAll();
        return itemList;
    }

    public String saveImageToStorage(MultipartFile image) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();

        Path imagePath = Path.of(imageUploadDirectory, fileName);

        Files.createDirectories(imagePath.getParent());
        Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

        return imagePath.toString();
    }

    public Map<String, Object> adminGetReservations() {
        log.info("admin get reservations ---> service");
        Map<String, Object> result = new HashMap<>();
        List<Reservation> reservationList = reservationRepository.findAll();

        reservationList.forEach((reservation) -> {
            User user = userRepository.findById(reservation.getUserID()).orElse(null);
            reservation.setUser(user);
            Order order = orderRepository.findByReservationID(reservation.getReservationID());
            reservation.setOrder(order);
            List<OrderItem> orderItemList = orderItemRepository.findByOrderID(order.getOrderID());
            order.setOrderItemList(orderItemList);
            if (reservation.getTableID() != null) {
                Tables table = tableRepository.findById(reservation.getTableID()).orElse(null);
                reservation.setTable(table);
            }
        });

        result.put("reservation", reservationList);

        return result;
    }

    // * remove type safety check
    @SuppressWarnings("unchecked")
    public Object adminSaveReservation(Map<String, Object> data) {
        log.info("admin save reservation ---> service");

        Map<String, Object> reservation = (Map<String, Object>) data.get("reservation");
        Map<String, Object> order = (Map<String, Object>) data.get("order");
        Map<String, Object> delivery = (Map<String, Object>) data.get("delivery");
        List<Map<String, Object>> orderItemsList = (List<Map<String, Object>>) data.get("orderItemsList");

        log.info("reservation details {}", reservation);
        log.info("order details {}", order);
        log.info("orderItemlist details {}", orderItemsList);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        // TODO : need to change
        User findUser = userRepository.findById(1).orElse(null);

        Order orderEntity = new Order();
        orderEntity.setOrder_status((String) order.get("order_status"));
        orderEntity.setDeliverer_address(findUser.getAddress());
        orderEntity.setOrder_created_dt(new Date());
        orderEntity.setOrder_updated_dt(new Date());
        orderEntity.setOrder_type((String) order.get("order_type"));

        Reservation reservationEntity = new Reservation();
        Delivery deliveryEntity = new Delivery();
        Order savedOrderEntity = null;
        if ("Reservation".equals(orderEntity.getOrder_type())) {
            reservationEntity.setPax_no((Integer) reservation.get("pax_no"));
            LocalDateTime dateTime = LocalDateTime.parse((String) reservation.get("reservation_dt"), formatter);
            Timestamp timestamp = Timestamp.valueOf(dateTime);
            log.info("reservation_dt {}", timestamp);
            Timestamp reservation_dt = Timestamp.valueOf(dateTime);
            reservationEntity.setReservation_dt(reservation_dt);
            reservationEntity.setReserve_status("Pending");
            reservationEntity.setReserve_remark((String) reservation.get("reserve_remark"));
            reservationEntity.setReserve_created_dt(new Timestamp(new Date().getTime()));
            reservationEntity.setTableID((Integer) reservation.get("table_id"));
            // TODO : need to change
            reservationEntity.setUserID(1);
            reservationEntity = reservationRepository.saveAndFlush(reservationEntity);
            log.info("save reservation done {}", reservationEntity);
            orderEntity.setTableID(reservationEntity.getTableID());
            orderEntity.setReservationID(reservationEntity.getReservationID());
            savedOrderEntity = orderRepository.saveAndFlush(orderEntity);
        } else if ("Delivery".equals(orderEntity.getOrder_type())) {
            savedOrderEntity = orderRepository.saveAndFlush(orderEntity);
            deliveryEntity.setDelivery_status((String) delivery.get("delivery_status"));
            deliveryEntity.setDelivery_remark((String) delivery.get("delivery_remark"));
            LocalDateTime dateTime = LocalDateTime.parse((String) delivery.get("delivery_start_dt"), formatter);
            Timestamp timestamp = Timestamp.valueOf(dateTime);
            log.info("delivery_start_dt {}", timestamp);
            Timestamp delivery_start_dt = Timestamp.valueOf(dateTime);
            deliveryEntity.setDelivery_start_dt(delivery_start_dt);
            LocalDateTime dateTime2 = LocalDateTime.parse((String) delivery.get("delivery_completed_dt"), formatter);
            Timestamp timestamp2 = Timestamp.valueOf(dateTime2);
            log.info("delivery_completed_dt {}", timestamp2);
            Timestamp delivery_completed_dt = Timestamp.valueOf(dateTime2);
            deliveryEntity.setDelivery_completed_dt(delivery_completed_dt);
            deliveryEntity.setArranged_by("Hardcode user: User A");
            deliveryEntity.setOrderID(savedOrderEntity.getOrderID());
            // todo update deliverymanID
            deliveryEntity.setDeliverymanID("1");
            Delivery savedDelivery = deliveryRepository.saveAndFlush(deliveryEntity);
            savedOrderEntity.setDeliveryID(savedDelivery.getDeliveryID());
            savedOrderEntity.setReservationID(null);
            savedOrderEntity.setTableID(null);
            savedOrderEntity = orderRepository.saveAndFlush(savedOrderEntity);
        }

        Order finalOrder = savedOrderEntity;

        List<OrderItem> orderItemEntity = new ArrayList<>();
        if (!Objects.isNull(finalOrder) && orderItemsList.size() > 0) {
            orderItemsList.forEach(item -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderID(finalOrder.getOrderID());
                orderItem.setItemID((Integer) item.get("item_id"));
                orderItem.setOrder_quantity((Integer) item.get("order_quantity"));
                orderItem.setItem_category((String) item.get("item_category"));
                orderItem.setItem_name((String) item.get("item_name"));
                orderItem.setItem_price((String) item.get("item_price"));
                orderItem.setOrder_remark((String) item.get("order_remark"));
                orderItemEntity.add(orderItem);
            });
            orderItemRepository.saveAllAndFlush(orderItemEntity);
        }

        Object result = new Object();
        result = reservationEntity;
        return result;

    }

    public void addReservation(int pax_no, String reservation_dt, String reserve_status, String reserve_remark,
                               String reserve_created_dt, Integer userID, Integer tableID) {
        // Init

        Reservation reserve = new Reservation();

//        LocalDateTime dateTime = LocalDateTime.parse((String) reservation.get("reservation_dt"), formatter);
//        Timestamp timestamp = Timestamp.valueOf(dateTime);
//        Timestamp reservation_dt = Timestamp.valueOf(dateTime);

        // convert reservation_dt  from string to timestamp
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime dateTime_reservation_dt = LocalDateTime.parse( reservation_dt.toString(), formatter);
        Timestamp t_reservation_dt = Timestamp.valueOf(dateTime_reservation_dt);
        log.info("reservation_dt {}", dateTime_reservation_dt);
        Timestamp reservation_dt2 = Timestamp.valueOf(dateTime_reservation_dt);

        // convert reservation_created_dt from string to timestamp
        LocalDateTime dateTime_reserve_created_dt = LocalDateTime.parse( reserve_created_dt.toString(), formatter);
        Timestamp t_dateTime_reserve_created_dt = Timestamp.valueOf(dateTime_reserve_created_dt);
        log.info("reserve_created_dt {}", dateTime_reservation_dt);
        Timestamp dateTime_reserve_created_dt2 = Timestamp.valueOf(dateTime_reserve_created_dt);

        reserve.setPax_no(pax_no);
        reserve.setReservation_dt(reservation_dt2);
        reserve.setReserve_remark(reserve_remark);
        reserve.setReserve_status(reserve_status);
        reserve.setUserID(userID);
        reserve.setReserve_created_dt(dateTime_reserve_created_dt2);
        reserve.setTableID(tableID);
        reservationRepository.saveAndFlush(reserve);
    }

    public Reservation adminGetOrdersById(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        User user = userRepository.findById(reservation.getUserID()).orElse(null);
        reservation.setUser(user);
        Order order = orderRepository.findByReservationID(reservation.getReservationID());
        reservation.setOrder(order);
        List<OrderItem> orderItemList = orderItemRepository.findByOrderID(order.getOrderID());
        order.setOrderItemList(orderItemList);
        if (reservation.getTableID() != null) {
            Tables table = tableRepository.findById(reservation.getTableID()).orElse(null);
            reservation.setTable(table);
        }
        log.info(reservation.toString());
        return reservation;
    }

    public User getUserProfile(String email) {
        User userProfile = userRepository.getUserProfile(email);
        log.info(userProfile.toString());
        return userProfile;
    }

    public int getUserAccessType(String email) {
        User user = userRepository.getUserProfile(email);
        int userAccessType = Integer.parseInt(user.getUser_access_type());
        return userAccessType;
    }

    public void editUserProfile(User userProfile) {
        log.info(userProfile.toString());
        userRepository.saveAndFlush(userProfile);
    }

    // * remove type safety check
    @SuppressWarnings("unchecked")
    public Object adminUpdateReservation(Map<String, Object> data) {

        Map<String, Object> reservation = (Map<String, Object>) data.get("reservation");
        Map<String, Object> order = (Map<String, Object>) data.get("order");
        List<Map<String, Object>> orderItemsList = (List<Map<String, Object>>) data.get("orderItemsList");

        Reservation reservationEntity = reservationRepository.findById((Integer) reservation.get("reservationID")).orElse(null);

        if (Objects.isNull(reservationEntity)) {
            return null;
        } else {
            reservationEntity.setPax_no((Integer) reservation.get("pax_no"));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");
            LocalDateTime dateTime = LocalDateTime.parse((String) reservation.get("reservation_dt"), formatter);
            Timestamp timestamp = Timestamp.valueOf(dateTime);
            log.info("reservation_dt {}", timestamp);
            Timestamp reservation_dt = Timestamp.valueOf(dateTime);
            reservationEntity.setReservation_dt(reservation_dt);
            reservationEntity.setReserve_status((String) reservation.get("reserve_status"));
            reservationEntity.setReserve_remark((String) reservation.get("reserve_remark"));
            reservationEntity.setTableID((Integer) reservation.get("table_id"));

            reservationEntity = reservationRepository.saveAndFlush(reservationEntity);

            Order orderEntity = orderRepository.findById((Integer) order.get("orderID")).orElse(null);
            orderEntity.setOrder_updated_dt(new Date());
            orderEntity.setTableID(reservationEntity.getTableID());
            Order savedOrder = orderRepository.saveAndFlush(orderEntity);

            List<OrderItem> orderItemEntity = new ArrayList<>();
            if (orderItemsList.size() > 0) {
                orderItemsList.forEach(item -> {
                    if (!Objects.isNull(item.get("order_itemID"))) {
                        OrderItem orderItem = orderItemRepository.findById((Integer) item.get("order_itemID")).orElse(null);
                        orderItem.setOrder_quantity((Integer) item.get("order_quantity"));                        
                        orderItem.setItem_price((String) item.get("item_price"));
                        orderItem.setOrder_remark((String) item.get("order_remark"));
                        orderItemEntity.add(orderItem);
                    } else {
                        OrderItem orderItem = new OrderItem();
                        orderItem.setOrderID(savedOrder.getOrderID());
                        orderItem.setItemID((Integer) item.get("item_id"));
                        orderItem.setOrder_quantity((Integer) item.get("order_quantity"));
                        orderItem.setItem_category((String) item.get("item_category"));
                        orderItem.setItem_name((String) item.get("item_name"));
                        orderItem.setItem_price((String) item.get("item_price"));
                        orderItem.setOrder_remark((String) item.get("order_remark"));
                        orderItemEntity.add(orderItem);
                    }
                });
                orderItemRepository.saveAllAndFlush(orderItemEntity);
            }

        }

        Object result = new Object();
        result = reservationEntity;

        return result;
    }

    public Object userAddOrder(Map<String, Object> data) {

        Map<String, Object> order = (Map<String, Object>) data.get("order");
        List<Map<String, Object>> orderItemsList = (List<Map<String, Object>>) data.get("orderItemsList");

        log.info("order details {}", order);
        log.info("orderItemlist details {}", orderItemsList);

        // Table set ID
        Tables tableEntity = new Tables();
        tableEntity.setTableID(1);

//        User findUser = userRepository.findById(reservationEntity.getUserID()).orElse(null);
        Order orderEntity = new Order();
        orderEntity.setOrder_status("Pending");
        orderEntity.setReservationID(null);
        orderEntity.setDeliverer_address("Hardcode address: Singapore");
        orderEntity.setOrder_created_dt(new Date());
        orderEntity.setOrder_updated_dt(new Date());
        orderEntity.setOrder_type((String) order.get("order_type"));
        orderEntity.setTableID((Integer)order.get("table_id"));
        orderEntity.setUpdated_by("Hardcode user: User A");
        orderEntity.setDeliveryID((Integer)order.get(null));
        orderEntity.setReservationID(null);

        Order savedOrderEntity = orderRepository.saveAndFlush(orderEntity);

        List<OrderItem> orderItemEntity = new ArrayList<>();
        if (orderItemsList.size() > 0) {
            orderItemsList.forEach(item -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderID(savedOrderEntity.getOrderID());
                orderItem.setItemID((Integer) item.get("item_id"));
                orderItem.setOrder_quantity((Integer) item.get("order_quantity"));
                orderItem.setItem_category((String) item.get("item_category"));
                orderItem.setItem_name((String) item.get("item_name"));
                orderItem.setItem_price((String) item.get("item_price"));
                orderItem.setOrder_remark((String) item.get("order_remark"));
                orderItemEntity.add(orderItem);
            });
            orderItemRepository.saveAllAndFlush(orderItemEntity);
        }
        Object result = new Object();
        result = orderEntity;
        return result;

    }

    public List<Tables> adminGetTables() {
        List<Tables> tableList = tableRepository.findAll();
        return tableList;
    }

    public Object adminAddTable(Tables table) {
        log.info("table details {}", table);
        Tables tableEntity = new Tables();

        tableEntity.setTable_size(table.getTable_size());
        tableEntity.setTable_status(table.getTable_status());
        tableEntity.setTable_created_dt(new Date());
        tableEntity.setCreated_by("Hardcode user: Admin A");
        tableEntity.setUserID(1);

        log.info("tableEntity details {}", tableEntity);

        return tableRepository.saveAndFlush(tableEntity);
    }

    public void adminUpdateTablePosition(Tables tables) {
        log.info("table details {}", tables);
        Tables tableEntity = tableRepository.findById(tables.getTableID()).orElse(null);

        tableEntity.setTable_x(tables.getTable_x());
        tableEntity.setTable_y(tables.getTable_y());
        tableEntity.setTable_modified_by("Hardcode user: Admin A");
        tableEntity.setTable_updated_dt(new Date());

        log.info("tableEntity details {}", tableEntity);

        tableRepository.saveAndFlush(tableEntity);
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }

    public static String generatePassword(int length) {
        StringBuilder password = new StringBuilder();

        // Ensure that the password has at least one uppercase letter, one lowercase letter, one digit, and one special character
        password.append(UPPER.charAt(random.nextInt(UPPER.length())));
        password.append(LOWER.charAt(random.nextInt(LOWER.length())));
        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
        password.append(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));

        // Generate the remaining characters randomly
        String allCharacters = UPPER + LOWER + DIGITS + SPECIAL_CHARACTERS;
        for (int i = 4; i < length; i++) {
            password.append(allCharacters.charAt(random.nextInt(allCharacters.length())));
        }
        return password.toString();
    }

    public List<User> getAllUser() {
        return userRepository.getAllUser();
    }

    public void deleteUser(String userID) {
        userRepository.deleteById(Integer.valueOf(userID));
    }

}
