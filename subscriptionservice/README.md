# subscriptionservice

Minimal Spring Boot backend for Subtrack.

Endpoints:
- POST /login { email } -> { token }
- GET /ai/insight (Authorization: Bearer <token>) -> { insight }

Configuration in `src/main/resources/application.properties`.

Run:

```
cd subscriptionservice
./mvnw spring-boot:run
```
