package com.tablehop.tablehop_restaurant_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages = { "com.tablehop.tablehop_restaurant_app" })
public class TablehopRestaurantAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TablehopRestaurantAppApplication.class, args);
	}

}
