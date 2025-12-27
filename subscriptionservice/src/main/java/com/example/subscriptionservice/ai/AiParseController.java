package com.example.subscriptionservice.ai;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
public class AiParseController {

    private final AiParseService aiParseService;

    public AiParseController(AiParseService aiParseService) {
        this.aiParseService = aiParseService;
    }

    @PostMapping("/parse")
    public AiParseResponse parse(@RequestBody AiParseRequest request) {
        return aiParseService.parse(request.getText());
    }
}
