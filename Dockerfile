FROM mcr.microsoft.com/playwright:v1.62.1-jammy AS base

WORKDIR /app

ENV CI=true \
    PLAYWRIGHT_RETRIES=3 \
    PLAYWRIGHT_WORKERS=2

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM deps AS browsers
RUN npx playwright install --with-deps

FROM browsers AS runtime
COPY playwright.config.ts tsconfig.json ./
COPY tests ./tests

CMD ["sh", "-c", "if [ \"$PLAYWRIGHT_SUITE\" = \"ui:desktop\" ]; then npm run test:ui:desktop; elif [ \"$PLAYWRIGHT_SUITE\" = \"ui:mobile\" ]; then npm run test:ui:mobile; elif [ \"$PLAYWRIGHT_SUITE\" = \"api\" ]; then npm run test:api; else npm run test:ui:all; fi"]
