FROM node:16-alpine

WORKDIR /application
COPY . .

EXPOSE 8080
CMD npm start