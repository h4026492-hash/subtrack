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
