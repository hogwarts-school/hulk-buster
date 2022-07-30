FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install yarn --location=global

RUN yarn

COPY . .

RUN npm run build \
    && npm prune --production

EXPOSE 3000

CMD ["node", "dist/main.js"]
