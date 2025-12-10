package org.example.ecommerce_spring_boot.service;

import org.example.ecommerce_spring_boot.model.Product;
import org.example.ecommerce_spring_boot.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @PostConstruct
    public void initializeProducts() {
        // Only add sample products if database is empty
        if (productRepository.count() == 0) {
            productRepository.save(new Product(null, "Laptop", "High-performance laptop with 16GB RAM, Intel i7 processor, 512GB SSD storage. Perfect for gaming and professional work.", 999.99, 10, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=faces"));
            productRepository.save(new Product(null, "Smartphone", "Latest model smartphone with 5G connectivity, 120Hz display, dual camera system with 108MP main sensor.", 799.99, 25, "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop"));
            productRepository.save(new Product(null, "Headphones", "Wireless noise-cancelling headphones with 30 hour battery life, premium sound quality, comfortable fit.", 249.99, 50, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"));
            productRepository.save(new Product(null, "Tablet", "10-inch tablet with stylus support, high refresh rate display, powerful processor for creative professionals.", 499.99, 15, "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop"));
            productRepository.save(new Product(null, "Monitor", "27-inch 4K monitor with HDR support, 144Hz refresh rate, perfect for gaming and content creation.", 399.99, 8, "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop"));
            productRepository.save(new Product(null, "Keyboard", "Mechanical gaming keyboard with RGB lighting, mechanical switches, programmable keys, great for gaming.", 149.99, 30, "https://media.currys.biz/i/currysprod/M10270673_black_002?$l-large$&fmt=auto"));
        }
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product p = existingProduct.get();
            p.setName(product.getName());
            p.setDescription(product.getDescription());
            p.setPrice(product.getPrice());
            p.setQuantity(product.getQuantity());
            p.setImageUrl(product.getImageUrl());
            return productRepository.save(p);
        }
        return null;
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
