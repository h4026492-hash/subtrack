package com.example.subscriptionservice;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String getInsight(String prompt) throws Exception {
        OkHttpClient client = new OkHttpClient();

        String json = """
        {
          "model": "gpt-4.1-mini",
          "messages": [
            {"role": "user", "content": "%s"}
          ]
        }
        """.formatted(prompt);

        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .post(RequestBody.create(json, MediaType.parse("application/json")))
                .addHeader("Authorization", "Bearer " + apiKey)
                .build();

        Response response = client.newCall(request).execute();
        String body = response.body().string();
        // Parse the OpenAI response and return the assistant message content if present
        try {
          com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
          com.fasterxml.jackson.databind.JsonNode root = mapper.readTree(body);
          com.fasterxml.jackson.databind.JsonNode choices = root.path("choices");
          if (choices.isArray() && choices.size() > 0) {
              com.fasterxml.jackson.databind.JsonNode message = choices.get(0).path("message");
              String content = message.path("content").asText(null);
              if (content != null) {
                // Normalize whitespace and trim
                content = content.replaceAll("\\s+", " ").trim();
                // Limit length for UI (safe default)
                int max = 600;
                if (content.length() > max) content = content.substring(0, max) + "...";
                return content;
              }
          }
        } catch (Exception e) {
          // fallback to raw body on parse errors
        }
        return body;
    }
}
