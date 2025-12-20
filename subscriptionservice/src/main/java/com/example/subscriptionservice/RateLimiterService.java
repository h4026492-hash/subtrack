package com.example.subscriptionservice;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {
    // simple per-owner sliding window counter (requests per hour)
    private final Map<String, Deque<Long>> store = new ConcurrentHashMap<>();
    private final long WINDOW_MS = 60 * 60 * 1000; // 1 hour
    private final int MAX_PER_WINDOW = 60; // max 60 requests per hour per user

    public synchronized boolean allow(String owner) {
        long now = Instant.now().toEpochMilli();
        Deque<Long> dq = store.computeIfAbsent(owner, k -> new ArrayDeque<>());
        while (!dq.isEmpty() && dq.peekFirst() < now - WINDOW_MS) dq.pollFirst();
        if (dq.size() >= MAX_PER_WINDOW) return false;
        dq.addLast(now);
        return true;
    }
}
