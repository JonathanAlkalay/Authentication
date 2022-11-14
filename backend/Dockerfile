FROM node:16 AS builder

COPY ./common/package*.json ./common/
RUN npm install --prefix common

COPY ./common ./common
RUN npm run build --prefix common

COPY ./backend/package*.json ./backend/
RUN npm install --prefix backend

COPY ./backend ./backend
RUN npm run build --prefix backend

FROM node:16-alpine

COPY --from=builder backend/dist ./backend
COPY --from=builder backend/package*.json ./backend/
RUN npm install --prefix backend

EXPOSE 8080
ENTRYPOINT ["node", "backend/main.js"]