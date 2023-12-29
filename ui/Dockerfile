FROM node:20.8.1-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENTRYPOINT ["yarn", "start"]
