package org.example.ecommerce_spring_boot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/info")
    public Map<String, Object> info() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to E-Commerce Application");
        response.put("description", "A basic Spring Boot e-commerce application");
        response.put("endpoints", new HashMap<String, String>() {{
            put("getAllProducts", "/api/products");
            put("getProductById", "/api/products/{id}");
            put("createProduct", "POST /api/products");
            put("updateProduct", "PUT /api/products/{id}");
            put("deleteProduct", "DELETE /api/products/{id}");
        }});
        return response;
    }
}
