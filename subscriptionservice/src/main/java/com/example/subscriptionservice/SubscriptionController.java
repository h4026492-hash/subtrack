package com.example.subscriptionservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    @Autowired
    private JwtService jwtService;

    private final SubscriptionRepository repository;

    public SubscriptionController(SubscriptionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<Subscription>> list(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        try {
            var claims = jwtService.parseToken(token);
            String email = claims.getSubject();
            var list = repository.findByOwner(email);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/stats/monthly")
    public ResponseEntity<java.util.List<Double>> monthlyStats(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        try {
            var claims = jwtService.parseToken(token);
            String email = claims.getSubject();
            double total = repository.sumForOwner(email);
            // simple deterministic past 4 months: 80%, 90%, 95%, 100% of current total
            java.util.List<Double> data = java.util.Arrays.asList(total * 0.8, total * 0.9, total * 0.95, total);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/total")
    public ResponseEntity<java.util.Map<String, Double>> total(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        try {
            var claims = jwtService.parseToken(token);
            String email = claims.getSubject();
            double total = repository.sumForOwner(email);
            return ResponseEntity.ok(java.util.Map.of("total", total));
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping
    public ResponseEntity<Subscription> create(@RequestHeader(name = "Authorization", required = false) String authHeader,
                                               @RequestBody Map<String, Object> body) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        try {
            var claims = jwtService.parseToken(token);
            String email = claims.getSubject();
            String name = (String) body.get("name");
            Number amount = (Number) body.getOrDefault("amount", 0);
            Subscription s = repository.createForOwner(email, name, amount.doubleValue());
            return ResponseEntity.ok(s);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}
