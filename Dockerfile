FROM node:alpine

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma/
COPY .env .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD npm start
