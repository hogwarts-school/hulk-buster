FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm intall yarn -g

RUN yarn

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]
