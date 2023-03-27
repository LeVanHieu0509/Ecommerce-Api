FROM node:14.15.4-alpine3.12

RUN mkdir -p /opt/app

EXPOSE 3000

WORKDIR /opt
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force

CMD [ "node", "app.js" ]