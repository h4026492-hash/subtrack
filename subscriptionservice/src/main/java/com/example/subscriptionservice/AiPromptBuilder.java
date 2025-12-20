package com.example.subscriptionservice;

import java.util.List;

public class AiPromptBuilder {

    public static String buildDashboardInsight(List<Subscription> subs) {
        return "Analyze these subscriptions and give a short spending insight: " + subs.toString();
    }

    public static String buildSubscriptionAdvice(Subscription sub) {
        return "Give advice on whether this subscription is worth keeping: " + sub.toString();
    }

    public static String buildChatPrompt(String question, List<Subscription> subs) {
        return "User subscriptions: " + subs + ". User question: " + question;
    }
}
