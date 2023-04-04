FROM node:16.20.0-alpine3.17

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . ./

CMD ["npm", "start"]