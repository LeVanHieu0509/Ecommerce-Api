FROM node:18

EXPOSE 8080
WORKDIR /app

RUN npm i npm@lastest -g

COPY package.json package-lock.json ./

COPY yarn.lock ./

RUN yarn install 

COPY . .

CMD ["node", "./src/app.ts"]