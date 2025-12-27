package com.example.subscriptionservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SubscriptionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private SubscriptionRepository repository;

    @Test
    void list_requiresAuth() throws Exception {
        mockMvc.perform(get("/subscriptions")).andExpect(status().isUnauthorized());
    }

    @Test
    void list_withToken_returnsList() throws Exception {
        String token = jwtService.generateToken("a@b.com");
        mockMvc.perform(get("/subscriptions").header("Authorization", "Bearer " + token)).andExpect(status().isOk());
    }

    @Test
    void create_withToken_creates() throws Exception {
        String token = jwtService.generateToken("a@b.com");
        mockMvc.perform(post("/subscriptions").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content("{\"name\":\"Test\",\"amount\":5}"))
                .andExpect(status().isOk());
    }

    @Test
    void total_requiresAuth() throws Exception {
        mockMvc.perform(get("/subscriptions/total")).andExpect(status().isUnauthorized());
    }

    @Test
    void total_withToken_returnsTotal() throws Exception {
        repository.createForOwner("a@b.com", "X", 10.0);
        repository.createForOwner("a@b.com", "Y", 15.0);
        String token = jwtService.generateToken("a@b.com");

        mockMvc.perform(get("/subscriptions/total").header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.total").exists());
    }
}
