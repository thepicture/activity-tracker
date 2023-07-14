FROM frontend:latest as build

FROM nginx:1.25.0-alpine

WORKDIR /home/node/app

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/public /usr/share/nginx/html
