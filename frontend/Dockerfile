FROM node:20-slim AS build
ARG VITE_API_URL
ARG VITE_NAVER_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_NAVER_URL=${VITE_NAVER_URL}

WORKDIR /app
COPY package*.json ./
RUN npm install vite@4.4.0
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build

EXPOSE 5173
