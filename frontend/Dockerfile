FROM node:20-slim AS build
ARG VITE_API_URL
ARG VITE_NAVER_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_NAVER_URL=${VITE_NAVER_URL}

WORKDIR /app
COPY package*.json ./
RUN npm install vite@4.4.0
RUN npm install
COPY . .
RUN npm run build

FROM nginx
WORKDIR /app
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
