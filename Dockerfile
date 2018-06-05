FROM node:10.2.1

COPY package*.json ./

RUN npm install

WORKDIR /app

COPY /app /app

WORKDIR /

CMD [ "npm", "start" ]