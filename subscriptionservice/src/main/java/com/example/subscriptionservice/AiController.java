package com.example.subscriptionservice;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/insight")
    public ResponseEntity<Map<String, String>> insight(@RequestHeader(name = "Authorization", required = false) String authHeader) throws Exception {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        String token = authHeader.substring(7);
        try {
            Claims claims = jwtService.parseToken(token);
            // TODO: optionally use claims.getSubject() for user-specific analysis
            String prompt = "Analyze my subscriptions and give spending insight.";
            String insight = aiService.getInsight(prompt);
            return ResponseEntity.ok(Map.of("insight", insight));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }
}
