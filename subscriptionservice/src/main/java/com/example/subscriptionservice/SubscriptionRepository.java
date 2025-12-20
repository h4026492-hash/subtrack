package com.example.subscriptionservice;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class SubscriptionRepository {
    private final Map<Long, Subscription> byId = new ConcurrentHashMap<>();
    private final AtomicLong seq = new AtomicLong(1);

    public List<Subscription> findByOwner(String owner) {
        List<Subscription> out = new ArrayList<>();
        for (Subscription s : byId.values()) {
            if (Objects.equals(s.getOwner(), owner)) out.add(s);
        }
        if (out.isEmpty()) {
            // seed defaults for demo
            seedDefaults(owner);
            return findByOwner(owner);
        }
        return out;
    }

    public double sumForOwner(String owner) {
        return findByOwner(owner).stream().mapToDouble(Subscription::getPrice).sum();
    }

    public Optional<Subscription> findById(Long id) {
        return Optional.ofNullable(byId.get(id));
    }

    public Subscription createForOwner(String owner, String name, double price) {
        Long id = seq.getAndIncrement();
        Subscription s = new Subscription(id, name, price, owner);
        byId.put(id, s);
        return s;
    }

    private void seedDefaults(String owner) {
        createForOwner(owner, "Netflix", 15.0);
        createForOwner(owner, "Spotify", 10.0);
    }
}
