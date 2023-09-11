package com.tablehop.tablehop_restaurant_app.DAO;

import java.util.*;

import org.slf4j.*;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.annotation.Resource;

import com.tablehop.tablehop_restaurant_app.DTO.*;

@Entity
public class tableHopDao {
    @PersistenceContext
    private EntityManager em;

    private static final Logger log = LoggerFactory.getLogger(tableHopDao.class);

}
