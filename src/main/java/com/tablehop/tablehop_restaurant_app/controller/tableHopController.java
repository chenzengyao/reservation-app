package com.tablehop.tablehop_restaurant_app.controller;

import java.util.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.tablehop.tablehop_restaurant_app.service.tableHopService;


@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class tableHopController {
    private static final Logger log = LoggerFactory.getLogger(tableHopController.class);

    @Autowired
    public tableHopService tableHopService;
}
