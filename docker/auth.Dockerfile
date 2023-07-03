FROM node:16-alpine

USER node
WORKDIR /home/node/app

COPY --chown=node:node . .
RUN npm ci

CMD [ "node", "./bin/www" ]