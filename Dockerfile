FROM node:12-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update
RUN apt-get install python -y
RUN apt-get install make -y
RUN apt-get install gcc -y
RUN apt-get install g++ -y
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
