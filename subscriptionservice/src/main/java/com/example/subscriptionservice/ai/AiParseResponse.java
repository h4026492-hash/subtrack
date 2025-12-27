package com.example.subscriptionservice.ai;

public class AiParseResponse {

    private String provider;
    private String plan;
    private double price;
    private String billingCycle;

    public AiParseResponse(String provider, String plan, double price, String billingCycle) {
        this.provider = provider;
        this.plan = plan;
        this.price = price;
        this.billingCycle = billingCycle;
    }

    public String getProvider() {
        return provider;
    }

    public String getPlan() {
        return plan;
    }

    public double getPrice() {
        return price;
    }

    public String getBillingCycle() {
        return billingCycle;
    }
}
