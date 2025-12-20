package com.example.subscriptionservice;

public class Subscription {
    private Long id;
    private String name;
    private double price;
    private String owner;

    public Subscription() {}

    public Subscription(Long id, String name, double price, String owner) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Subscription{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", owner='" + owner + '\'' +
                '}';
    }
}
