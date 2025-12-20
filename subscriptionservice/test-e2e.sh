#!/usr/bin/env bash
set -euo pipefail

BASE_URL=${BASE_URL:-http://localhost:8081}

echo "Logging in..."
TOKEN=$(curl -s -X POST "${BASE_URL}/login" -H "Content-Type: application/json" -d '{"email":"e2e@local"}' | jq -r .token)
if [ -z "${TOKEN}" ] || [ "${TOKEN}" == "null" ]; then
  echo "Login failed or no token returned"
  exit 1
fi
echo "Token retrieved"

echo "Calling AI insight..."
curl -s -H "Authorization: Bearer ${TOKEN}" "${BASE_URL}/ai/insight" | jq .

echo "Listing subscriptions..."
curl -s -H "Authorization: Bearer ${TOKEN}" "${BASE_URL}/subscriptions" | jq .

echo "Creating subscription..."
curl -s -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -X POST "${BASE_URL}/subscriptions" -d '{"name":"E2E Service","amount":4.99}' | jq .

echo "E2E script finished"
