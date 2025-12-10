package org.example.ecommerce_spring_boot.service;

import org.example.ecommerce_spring_boot.model.Order;
import org.example.ecommerce_spring_boot.model.OrderItem;
import org.example.ecommerce_spring_boot.model.Product;
import org.example.ecommerce_spring_boot.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductService productService;

    public Order createOrder(Order order, List<OrderItem> items) {
        // Update product quantities in database
        System.out.println("OrderService.createOrder called with " + items.size() + " items");
        for (OrderItem item : items) {
            try {
                Long productId = item.getProductId();
                Integer quantity = item.getQuantity();
                System.out.println("Updating product " + productId + " quantity by -" + quantity);
                
                Product product = productService.getProductById(productId);
                if (product != null) {
                    int oldQuantity = product.getQuantity();
                    int newQuantity = oldQuantity - quantity;
                    if (newQuantity < 0) {
                        newQuantity = 0;
                    }
                    product.setQuantity(newQuantity);
                    System.out.println("Product " + productId + ": " + oldQuantity + " -> " + newQuantity);
                    productService.updateProduct(productId, product);
                }
            } catch (Exception e) {
                System.err.println("Error updating product quantity: " + e.getMessage());
                e.printStackTrace();
            }
        }
        
        // Save the order
        return orderRepository.save(order);
    }

    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}