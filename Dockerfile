FROM mcr.microsoft.com/playwright:v1.62.1-jammy AS runtime

WORKDIR /app

ENV CI=true

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["bash"]