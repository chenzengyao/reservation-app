DROP SCHEMA restaurant;

CREATE SCHEMA restaurant;
Use restaurant;

CREATE TABLE `user` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone_no` VARCHAR(10) NOT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  `dob` DATE NOT NULL,
  `user_type` VARCHAR(255) NOT NULL,
  `user_access_type` VARCHAR(255) NOT NULL,
  `created_dt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_dt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `Unique_userID` (`userID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `table` (
  `tableID` INT NOT NULL AUTO_INCREMENT,
  `table_size` VARCHAR(255) NOT NULL,
  `table_status` VARCHAR(255) NOT NULL,
  `table_created_dt` DATETIME NOT NULL,
  `table_updated_dt` DATETIME DEFAULT NULL,
  `table_modified_by` VARCHAR(32) DEFAULT NULL,
  `created_by` VARCHAR(255) NOT NULL,
  `arranged_by` VARCHAR(255) DEFAULT NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`tableID`),
  UNIQUE KEY `Unique_tableID` (`tableID`),
  KEY `userID` (`userID`),
  CONSTRAINT `user_FK21` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `reservation` (
  `reservationID` INT NOT NULL AUTO_INCREMENT,
  `pax_no`INT(3) NOT NULL,
  `reservation_dt` DATETIME NOT NULL,
  `reserve_status` VARCHAR(255) NOT NULL,
  `reserve_remark` VARCHAR(255) NOT NULL,
  `reserve_created_dt` DATETIME NOT NULL,
  `userID` INT NOT NULL,
  `tableID` INT NOT NULL,
  PRIMARY KEY (`reservationID`),
  UNIQUE KEY `Unique_reservationID` (`reservationID`),
  KEY `userID` (`userID`),
  KEY `tableID` (`tableID`),
  CONSTRAINT `user_FK2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `table_FK1` FOREIGN KEY (`tableID`) REFERENCES `table` (`tableID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `item` (
  `itemID` INT NOT NULL AUTO_INCREMENT,
  `itam_category` VARCHAR(255) NOT NULL,
  `item_name` VARCHAR(255) NOT NULL,
  `item_description` VARCHAR(500) NOT NULL,
  `item_price` VARCHAR(10) NOT NULL,
  `itam_remark` VARCHAR(255) NOT NULL,
  `itam_status` VARCHAR(255) NOT NULL,
  `itam_image` VARCHAR(255) NOT NULL,
  `item_created_dt` DATETIME NOT NULL,
  `item_updated_dt` DATETIME DEFAULT NULL,
  `created_by` VARCHAR(255) NOT NULL,
  `updated_by` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`itemID`),
  UNIQUE KEY `Unique_itemID` (`itemID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `order` (
  `orderID` INT NOT NULL AUTO_INCREMENT,
  `order_type` VARCHAR(255) NOT NULL,
  `order_status` VARCHAR(255) NOT NULL,
  `deliverer_address` VARCHAR(255) NOT NULL,
  `order_created_dt` DATETIME NOT NULL,
  `order_updated_dt` DATETIME DEFAULT NULL,
  `updated_by` VARCHAR(255) DEFAULT NULL,
  `tableID` INT NOT NULL,
  `deliveryID` INT NOT NULL,
  PRIMARY KEY (`orderID`),
  UNIQUE KEY `Unique_orderID` (`orderID`),
  KEY `tableID` (`tableID`),
  CONSTRAINT `table_FK2` FOREIGN KEY (`tableID`) REFERENCES `table` (`tableID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `order_item` (
  `order_itemID` INT NOT NULL AUTO_INCREMENT,
  `item_category` VARCHAR(255) NOT NULL,
  `order_quantity` INT(2) NOT NULL,
  `order_remark` VARCHAR(255) NOT NULL,
  `item_name` VARCHAR(255) NOT NULL,
  `item_price` VARCHAR(10) NOT NULL,
  `orderID` INT NOT NULL,
  `itemID` INT NOT NULL,
  PRIMARY KEY (`order_itemID`),
  UNIQUE KEY `Unique_order_itemID` (`order_itemID`),
  KEY `itemID` (`itemID`),
  CONSTRAINT `item_FK1` FOREIGN KEY (`itemID`) REFERENCES `item` (`itemID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `payment` (
  `paymentID` INT NOT NULL AUTO_INCREMENT,
  `payment_type` VARCHAR(255) NOT NULL,
  `payment_dt` DATETIME NOT NULL,
  `sub_total_price` VARCHAR(10) NOT NULL,
  `discount_coupun` VARCHAR(255) NOT NULL,
  `gst` VARCHAR(10) NOT NULL,
  `service_tax` VARCHAR(10) NOT NULL,
  `total_price` VARCHAR(10) NOT NULL,
  `userID` INT NOT NULL,
  `orderID` INT NOT NULL,
  PRIMARY KEY (`paymentID`),
  UNIQUE KEY `Unique_paymentID` (`paymentID`),
  KEY `userID` (`userID`),
  CONSTRAINT `user_FK3` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `delivery` (
  `deliveryID` INT NOT NULL AUTO_INCREMENT,
  `delivery_status` VARCHAR(255) NOT NULL,
  `delivery_remark` VARCHAR(255) NOT NULL,
  `delivery_start_dt` DATETIME NOT NULL,
  `delivery_completed_dt` DATETIME NOT NULL,
  `updated_by` VARCHAR(255) DEFAULT NULL,
  `arranged_by` VARCHAR(255) NOT NULL,
  `orderID` INT NOT NULL,
  `deliverymanID` INT NOT NULL,
  PRIMARY KEY (`deliveryID`),
  UNIQUE KEY `Unique_deliveryID` (`deliveryID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE `deliveryman` (
  `deliverymanID` INT NOT NULL AUTO_INCREMENT,
  `deliveryman_phone_no` VARCHAR(10) NOT NULL,
  `deliveryman_created_dt` DATETIME NOT NULL,
  `deliveryman_updated_dt` DATETIME DEFAULT NULL,
  `deliveryID` INT NOT NULL,
  PRIMARY KEY (`deliverymanID`),
  UNIQUE KEY `Unique_deliverymanID` (`deliverymanID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;


ALTER TABLE `order` ADD CONSTRAINT `delivery_FK1` FOREIGN KEY (`deliveryID`) REFERENCES `delivery` (`deliveryID`);
ALTER TABLE `order_item` ADD CONSTRAINT `order_FK1` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`);
ALTER TABLE `payment` ADD CONSTRAINT `order_FK2` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`);
ALTER TABLE `delivery` ADD CONSTRAINT `order_FK3` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`);
ALTER TABLE `delivery` ADD CONSTRAINT `deliverymanID_FK1` FOREIGN KEY (`deliverymanID`) REFERENCES `deliveryman` (`deliverymanID`);
ALTER TABLE `deliveryman` ADD CONSTRAINT `delivery_FK2` FOREIGN KEY (`deliveryID`) REFERENCES `delivery` (`deliveryID`);