package org.example.ecommerce_spring_boot.controller;

import org.example.ecommerce_spring_boot.model.Order;
import org.example.ecommerce_spring_boot.model.Product;
import org.example.ecommerce_spring_boot.service.OrderService;
import org.example.ecommerce_spring_boot.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    // Static manager credentials
    private static final String MANAGER_USERNAME = "admin";
    private static final String MANAGER_PASSWORD = "password123";

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody ManagerLoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        if (MANAGER_USERNAME.equals(loginRequest.getUsername()) && 
            MANAGER_PASSWORD.equals(loginRequest.getPassword())) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", "manager-token-" + System.currentTimeMillis());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product createdProduct = productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
}

class ManagerLoginRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
