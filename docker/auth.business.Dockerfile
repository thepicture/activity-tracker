FROM node:16-alpine

USER node
WORKDIR /home/node/app

COPY --chown=node:node . .
RUN npm ci && npm run build

CMD [ "node", "./dist/index.js" ]