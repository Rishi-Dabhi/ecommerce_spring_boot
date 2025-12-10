package org.example.ecommerce_spring_boot.controller;

import org.example.ecommerce_spring_boot.model.Order;
import org.example.ecommerce_spring_boot.model.OrderItem;
import org.example.ecommerce_spring_boot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            Order order = new Order(
                orderRequest.getCustomerName(),
                orderRequest.getEmail(),
                orderRequest.getAddress(),
                orderRequest.getCity(),
                orderRequest.getZipCode(),
                orderRequest.getCardLastFour(),
                orderRequest.getItemsJson(),
                orderRequest.getTotalAmount()
            );
            
            // Parse items and update quantities
            List<OrderItem> items = parseItems(orderRequest.getItems());
            Order savedOrder = orderService.createOrder(order, items);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        Order order = orderService.getOrder(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }

    private List<OrderItem> parseItems(List<OrderItem> items) {
        return items;
    }
}

class OrderRequest {
    private String customerName;
    private String email;
    private String address;
    private String city;
    private String zipCode;
    private String cardLastFour;
    private String itemsJson;
    private Double totalAmount;
    private List<OrderItem> items;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCardLastFour() {
        return cardLastFour;
    }

    public void setCardLastFour(String cardLastFour) {
        this.cardLastFour = cardLastFour;
    }

    public String getItemsJson() {
        return itemsJson;
    }

    public void setItemsJson(String itemsJson) {
        this.itemsJson = itemsJson;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
