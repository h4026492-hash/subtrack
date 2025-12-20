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
        return response.body().string();
    }
}
