FROM node:16 AS builder

COPY ./common/package*.json ./common/
RUN npm install --prefix common

COPY ./common ./common
RUN npm run build --prefix common

COPY ./authentication/package*.json ./authentication/
RUN npm install --prefix authentication

COPY ./authentication ./authentication
RUN npm run build --prefix authentication

FROM node:16-alpine

COPY --from=builder authentication/dist ./authentication
COPY --from=builder authentication/package*.json ./authentication/
COPY --from=builder authentication/src/prisma/schema.prisma ./authentication

RUN npm install --prefix authentication
RUN cd ./authentication && npx prisma generate

EXPOSE 443
ENTRYPOINT ["node", "authentication/main.js"]