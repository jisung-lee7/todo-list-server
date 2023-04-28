FROM node:alpine

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npm start
