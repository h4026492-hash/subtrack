package com.example.subscriptionservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "email required"));
        }
        String token = jwtService.generateToken(email);
        return ResponseEntity.ok(Map.of("token", token));
    }

    // Simple interview-friendly auth endpoint
    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, String>> authLogin(@RequestBody LoginRequest req) {
        if (req == null || req.getEmail() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "email required"));
        }
        if ("test@test.com".equals(req.getEmail())) {
            String token = jwtService.generateToken(req.getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }
}
