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

    @Test
    void insight_requiresAuth() throws Exception {
        mockMvc.perform(get("/ai/insight")).andExpect(status().isUnauthorized());
    }

    @Test
    void insight_withValidToken_returnsInsight() throws Exception {
        when(aiService.getInsight("Analyze my subscriptions and give spending insight.")).thenReturn("You are spending more on subscriptions.");

        String token = jwtService.generateToken("a@b.com");

        mockMvc.perform(get("/ai/insight").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.insight").exists());
    }
}
