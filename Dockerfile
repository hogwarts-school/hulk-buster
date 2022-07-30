FROM node:16

WORKDIR /usr/src/app

COPY yarn.lock ./

RUN yarn global add rimraf

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]
