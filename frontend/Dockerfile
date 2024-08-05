FROM node:20-slim AS build
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
