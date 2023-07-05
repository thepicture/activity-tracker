FROM node:16-alpine AS build

WORKDIR /home/node/app

COPY . .
RUN npm ci

RUN npm run build