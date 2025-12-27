# Postman / Newman Instructions

To run the collection locally using newman:

1. Install newman: `npm i -g newman`
2. Start the backend locally (on port 8080):
   - If you have Maven: `mvn -pl subscriptionservice spring-boot:run`
   - Or use the Maven wrapper: `./mvnw -pl subscriptionservice spring-boot:run`
3. Run newman:
   - `newman run postman/SubTrack.postman_collection.json --env-var baseUrl=http://localhost:8080`

Notes:
- The collection expects the demo auth login to succeed (email `test@test.com`).
- The first request stores a `token` environment variable and subsequent requests use it.
