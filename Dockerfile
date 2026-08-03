FROM mcr.microsoft.com/playwright:v1.62.1-jammy

WORKDIR /app

ENV CI=true

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

CMD ["bash"]