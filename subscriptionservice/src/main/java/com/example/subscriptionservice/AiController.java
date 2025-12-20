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
            String owner = claims.getSubject();
            var subs = repository.findByOwner(owner);
            String prompt = AiPromptBuilder.buildDashboardInsight(subs);
            String insight = aiService.getInsight(prompt);
            return ResponseEntity.ok(Map.of("insight", insight));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }

    @GetMapping("/subscription/{id}")
    public ResponseEntity<Map<String, String>> subscriptionAi(@RequestHeader(name = "Authorization", required = false) String authHeader, @PathVariable Long id) throws Exception {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        String token = authHeader.substring(7);
        try {
            Claims claims = jwtService.parseToken(token);
            String owner = claims.getSubject();
            var sub = repository.findById(id).orElse(null);
            if (sub == null || !owner.equals(sub.getOwner())) {
                return ResponseEntity.status(404).body(Map.of("error", "Not found"));
            }
            String prompt = AiPromptBuilder.buildSubscriptionAdvice(sub);
            String insight = aiService.getInsight(prompt);
            return ResponseEntity.ok(Map.of("insight", insight));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }

    @GetMapping("/prediction")
    public ResponseEntity<Map<String, String>> prediction(@RequestHeader(name = "Authorization", required = false) String authHeader) throws Exception {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        String token = authHeader.substring(7);
        try {
            Claims claims = jwtService.parseToken(token);
            String owner = claims.getSubject();
            var subs = repository.findByOwner(owner);
            String prompt = "Predict next month's spend based on: " + subs.toString();
            String result = aiService.getInsight(prompt);
            return ResponseEntity.ok(Map.of("prediction", result));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }
}
