package com.tablehop.tablehop_restaurant_app.service;

import com.tablehop.tablehop_restaurant_app.controller.tableHopController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.tablehop.tablehop_restaurant_app.entity.User;
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

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
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

    @Value("${image.upload.directory}")
    private String imageUploadDirectory;

    public void register(String username, String email, String phone_no, String password, String dob) {
        // Init
        User user = new User();
        user.setUserName(username);
        user.setEmail(email);
        user.setPhone_no(phone_no);
        user.setPassword(password);
        // user.setDob(dob);
        user.setUser_type("user");
        user.setUser_access_type("1");
        userRepository.saveAndFlush(user);
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
            String item_created_dt, String created_by, String image) {
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
        if (image != null) {
            menu.setItem_image(image);
        }
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
        List<Map<String, Object>> orderItemsList = (List<Map<String, Object>>) data.get("orderItemsList");

        log.info("reservation details {}", reservation);
        log.info("order details {}", order);
        log.info("orderItemlist details {}", orderItemsList);

        Reservation reservationEntity = new Reservation();
        reservationEntity.setPax_no((Integer) reservation.get("pax_no"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse((String) reservation.get("reservation_dt"), formatter);
        Timestamp timestamp = Timestamp.valueOf(dateTime);
        log.info("reservation_dt {}", timestamp);
        Timestamp reservation_dt = Timestamp.valueOf(dateTime);
        reservationEntity.setReservation_dt(reservation_dt);
        reservationEntity.setReserve_status((String) reservation.get("reserve_status"));
        reservationEntity.setReserve_remark((String) reservation.get("reserve_remark"));
        reservationEntity.setReserve_created_dt(new Timestamp(new Date().getTime()));
        reservationEntity.setTableID((Integer) reservation.get("table_id"));
        // TODO : need to change
        reservationEntity.setUserID(1);
        reservationEntity = reservationRepository.saveAndFlush(reservationEntity);
        log.info("save reservation done {}", reservationEntity);

        User findUser = userRepository.findById(reservationEntity.getUserID()).orElse(null);
        Order orderEntity = new Order();
        orderEntity.setOrder_status("Pending");
        orderEntity.setReservationID(reservationEntity.getReservationID());
        orderEntity.setDeliverer_address(findUser.getAddress());
        orderEntity.setOrder_created_dt(new Date());
        orderEntity.setOrder_updated_dt(new Date());
        orderEntity.setOrder_type("");
        orderEntity.setTableID(reservationEntity.getTableID());
        orderEntity.setDeliveryID(null);

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

    public void editUserProfile(User userProfile) {
        log.info(userProfile.toString());
        userRepository.saveAndFlush(userProfile);
    }

}
