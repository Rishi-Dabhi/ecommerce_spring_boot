package org.example.ecommerce_spring_boot.repository;

import org.example.ecommerce_spring_boot.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
