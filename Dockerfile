FROM node:12
WORKDIR ./project/
COPY . .
WORKDIR ./react-front-end/
RUN npm install
RUN npm run build
WORKDIR ./../express-back-end
RUN npm install
RUN mkdir public
RUN mv ../react-front-end/build/* ./public/
EXPOSE 5000
CMD npm run start