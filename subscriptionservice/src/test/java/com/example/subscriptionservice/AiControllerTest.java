package com.example.subscriptionservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AiService aiService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private SubscriptionRepository repository;

    @Test
    void insight_requiresAuth() throws Exception {
        mockMvc.perform(get("/ai/insight")).andExpect(status().isUnauthorized());
    }

    @Test
    void insight_withValidToken_returnsInsight() throws Exception {
        // seed a subscription for user
        repository.createForOwner("a@b.com", "Netflix", 15.0);
        when(aiService.getInsight(org.mockito.ArgumentMatchers.anyString())).thenReturn("You are spending more on subscriptions.");

        String token = jwtService.generateToken("a@b.com");

        mockMvc.perform(get("/ai/insight").header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.insight").exists());
    }

        @Test
        void subscriptionAi_returnsAdvice() throws Exception {
        Subscription s = repository.createForOwner("a@b.com", "Test", 5.0);
        when(aiService.getInsight(org.mockito.ArgumentMatchers.anyString())).thenReturn("Consider downgrading.");

        String token = jwtService.generateToken("a@b.com");

        mockMvc.perform(get("/ai/subscription/" + s.getId()).header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.insight").exists());
        }

        @Test
        void chat_requiresAuth() throws Exception {
            mockMvc.perform(post("/ai/chat").contentType("application/json").content("{\"prompt\":\"hi\"}"))
                .andExpect(status().isUnauthorized());
        }

        @Test
        void chat_withValidToken_returnsReply() throws Exception {
            when(aiService.getInsight(org.mockito.ArgumentMatchers.anyString())).thenReturn("Hello from AI");

            String token = jwtService.generateToken("a@b.com");

            mockMvc.perform(post("/ai/chat").header("Authorization", "Bearer " + token)
                    .contentType("application/json").content("{\"prompt\":\"Which subscription to cancel?\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.reply").exists());
        }

        @Test
        void prediction_returnsText() throws Exception {
        repository.createForOwner("a@b.com", "X", 1.0);
        when(aiService.getInsight(org.mockito.ArgumentMatchers.anyString())).thenReturn("Next month predicted spend: $123");

        String token = jwtService.generateToken("a@b.com");

        mockMvc.perform(get("/ai/prediction").header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.prediction").exists());
        }
}
