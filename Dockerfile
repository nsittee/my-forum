FROM node:12

WORKDIR /project
COPY express-back-end/ .
RUN npm install

EXPOSE 5000
CMD npm run start