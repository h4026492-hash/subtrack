package com.example.subscriptionservice.ai;

import org.springframework.stereotype.Service;

@Service
public class AiParseService {

    public AiParseResponse parse(String text) {
        String lower = (text == null) ? "" : text.toLowerCase();

        String provider = "Unknown";
        String plan = "Standard";
        double price = 0;
        String billingCycle = "MONTHLY";

        if (lower.contains("netflix")) provider = "Netflix";
        if (lower.contains("spotify")) provider = "Spotify";
        if (lower.contains("amazon")) provider = "Amazon";
        if (lower.contains("hulu")) provider = "Hulu";

        if (lower.contains("premium")) plan = "Premium";
        if (lower.contains("basic")) plan = "Basic";

        if (lower.contains("year")) billingCycle = "YEARLY";

        // Extract first number found
        String[] parts = lower.split("\\s+");
        for (String p : parts) {
            try {
                String cleaned = p.replaceAll("[^0-9.]", "");
                if (cleaned.length() == 0) continue;
                price = Double.parseDouble(cleaned);
                break;
            } catch (Exception ignored) {
            }
        }

        return new AiParseResponse(provider, plan, price, billingCycle);
    }
}
