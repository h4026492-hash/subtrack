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

    // In-memory store for demo purposes
    private final Map<String, List<Map<String, Object>>> store = new HashMap<>();

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> list(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        try {
            var claims = jwtService.parseToken(token);
            String email = claims.getSubject();
            var list = store.getOrDefault(email, defaultSubscriptions(email));
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestHeader(name = "Authorization", required = false) String authHeader,
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
            Map<String, Object> item = new HashMap<>();
            item.put("id", UUID.randomUUID().toString());
            item.put("name", name);
            item.put("price", amount.doubleValue());
            item.put("owner", email);
            store.computeIfAbsent(email, k -> new ArrayList<>()).add(item);
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    private List<Map<String, Object>> defaultSubscriptions(String email) {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> a = new HashMap<>();
        a.put("id", "1");
        a.put("name", "Netflix");
        a.put("price", 15.0);
        a.put("owner", email);
        Map<String, Object> b = new HashMap<>();
        b.put("id", "2");
        b.put("name", "Spotify");
        b.put("price", 10.0);
        b.put("owner", email);
        list.add(a);
        list.add(b);
        store.put(email, list);
        return list;
    }
}
