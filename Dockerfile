FROM node:12

WORKDIR /application
COPY . .

EXPOSE 8080
CMD npm start