FROM mcr.microsoft.com/playwright:v1.62.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx playwright install --with-deps

ENV PLAYWRIGHT_SUITE=ui:all

CMD ["sh", "-c", "if [ \"$PLAYWRIGHT_SUITE\" = \"ui:desktop\" ]; then npm run test:ui:desktop; elif [ \"$PLAYWRIGHT_SUITE\" = \"ui:mobile\" ]; then npm run test:ui:mobile; elif [ \"$PLAYWRIGHT_SUITE\" = \"api\" ]; then npm run test:api; else npm run test:ui:all; fi"]
