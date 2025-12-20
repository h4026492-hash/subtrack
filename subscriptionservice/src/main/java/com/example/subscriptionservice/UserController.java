package com.example.subscriptionservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> profile(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        try {
            var claims = jwtService.parseToken(token);
            return ResponseEntity.ok(Map.of("email", claims.getSubject()));
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}
