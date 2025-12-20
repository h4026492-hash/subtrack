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

    @Autowired
    private RateLimiterService rateLimiterService;

    // Simple in-memory cache to reduce duplicate AI calls (id -> (value,timestamp))
    private final java.util.Map<Long, java.util.Map<String, Object>> subscriptionCache = new java.util.concurrent.ConcurrentHashMap<>();
    private final java.util.Map<String, java.util.Map<String, Object>> dashboardCache = new java.util.concurrent.ConcurrentHashMap<>();
    private final long CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

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
            // rate limit per owner
            if (!rateLimiterService.allow(owner)) {
                return ResponseEntity.status(429).body(Map.of("error", "Rate limit exceeded"));
            }

            // check dashboard cache
            java.util.Map<String, Object> cached = dashboardCache.get(owner);
            if (cached != null && (Long) cached.getOrDefault("ts", 0L) + CACHE_TTL_MS > System.currentTimeMillis()) {
                return ResponseEntity.ok(Map.of("insight", (String) cached.getOrDefault("insight", "")));
            }

            String prompt = AiPromptBuilder.buildDashboardInsight(subs);
            String insight = aiService.getInsight(prompt);

            // try to parse structured result
            java.util.Map<String, Object> parsed = tryParseJson(insight);
            String returnText = insight;
            if (parsed != null && parsed.containsKey("summary")) {
                returnText = parsed.get("summary").toString();
            }

            dashboardCache.put(owner, java.util.Map.of("insight", returnText, "ts", System.currentTimeMillis()));
            return ResponseEntity.ok(Map.of("insight", returnText));
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
            // rate limit per owner
            if (!rateLimiterService.allow(owner)) {
                return ResponseEntity.status(429).body(Map.of("error", "Rate limit exceeded"));
            }

            // check cache
            java.util.Map<String, Object> cached = subscriptionCache.get(id);
            if (cached != null && (Long) cached.getOrDefault("ts", 0L) + CACHE_TTL_MS > System.currentTimeMillis()) {
                return ResponseEntity.ok(Map.of("insight", (String) cached.getOrDefault("insight", "")));
            }

            String prompt = AiPromptBuilder.buildSubscriptionAdvice(sub);
            String insight = aiService.getInsight(prompt);

            // attempt to parse structured JSON from assistant
            java.util.Map<String, Object> parsed = tryParseJson(insight);
            String returnText = insight;
            if (parsed != null && parsed.containsKey("recommendation")) {
                // store a normalized form
                returnText = parsed.get("recommendation").toString();
            }

            subscriptionCache.put(id, java.util.Map.of("insight", returnText, "ts", System.currentTimeMillis()));
            return ResponseEntity.ok(Map.of("insight", returnText));
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

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestHeader(name = "Authorization", required = false) String authHeader,
                                                    @RequestBody Map<String, Object> body) throws Exception {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        String token = authHeader.substring(7);
        try {
            Claims claims = jwtService.parseToken(token);
            String owner = claims.getSubject();
            // rate limit per owner
            if (!rateLimiterService.allow(owner)) {
                return ResponseEntity.status(429).body(Map.of("error", "Rate limit exceeded"));
            }

            String prompt = (String) body.getOrDefault("prompt", "");
            String reply = aiService.getInsight(prompt);
            return ResponseEntity.ok(Map.of("reply", reply));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }

    // attempt to parse assistant response content as JSON to extract structured fields
    private java.util.Map<String, Object> tryParseJson(String text) {
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            return mapper.readValue(text, java.util.Map.class);
        } catch (Exception e) {
            return null;
        }
    }
}
