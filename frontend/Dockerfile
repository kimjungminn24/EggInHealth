FROM node:20-slim AS build
ARG VITE_API_URL
ARG VITE_NAVER_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_NAVER_URL=${VITE_NAVER_URL}

WORKDIR /app
COPY package*.json ./
RUN npm install vite@4.4.0
RUN npm install firebase
RUN npm install vite-plugin-pwa
RUN npm install sockjs-client@latest
RUN npm install stompjs@latest
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
CMD ["serve","-s","dist","-l","5173"]
EXPOSE 5173
