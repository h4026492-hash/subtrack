# subscriptionservice

Minimal Spring Boot backend for Subtrack.

Endpoints:

Configuration in `src/main/resources/application.properties`.

Run:

```
cd subscriptionservice
./mvnw spring-boot:run
```
Run tests (requires Maven):

```bash
./mvnw test
```

End-to-end quick test (requires jq):

```bash
./test-e2e.sh
```

Set BASE_URL environment variable to point to the server if you run it on a different host or port.
