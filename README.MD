
# my-forum project

project link -> https://github.com/nsittee/my-forum

build server first then build client, not the other way around

### Config File
create `.env.local` from the sample and place it in the `.env` folder
create `.env.production` for the production built
### Development
To start development on local machine, run 
```
npm run all:install
npm run dev
```
### Deployment
To test the deployment process on a local machine, run 
```
npm run ci:build
npm run ci:start
```
