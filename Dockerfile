FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm intall yarn -g

RUN yarn

COPY . .

<<<<<<< HEAD
=======
RUN npm run build \
    && npm prune --production

>>>>>>> d71de25 (chore: add dockerfile)
EXPOSE 3000

CMD ["node", "dist/main.js"]
