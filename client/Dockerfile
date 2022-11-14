FROM node:16 AS builder

COPY ./common/package*.json ./common/
RUN npm install --prefix common

COPY ./common ./common
RUN npm run build --prefix common

COPY ./client/package*.json ./client/
RUN npm install --prefix client

COPY ./client ./client
RUN npm run build --prefix client

FROM nginx:alpine

COPY --from=builder client/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]