FROM node:20-alpine

WORKDIR /app

# netcat 설치
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 