#!/bin/sh

echo "> check NEXT_PUBLIC_ var"
test -n "$NEXT_PUBLIC_API_URL"
test -n "$NEXT_PUBLIC_SHOPIFY_API_KEY"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_API_URL#$NEXT_PUBLIC_API_URL#g"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_SHOPIFY_API_KEY#$NEXT_PUBLIC_SHOPIFY_API_KEY#g"

echo "> start Nextjs"
exec "$@"
