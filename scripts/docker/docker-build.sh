BANNER="###################"
bannerMessage() {
  echo "$BANNER$BANNER$BANNER"
  echo "$BANNER $1"
  echo "$BANNER$BANNER$BANNER"
  echo ""
}

bannerMessage "Install node dependency"
npm install
npm run client:install

bannerMessage "Build application"
npm run server:build
npm run client:build

bannerMessage "Remove files"
rm -rf src/client/node_modules

bannerMessage "Docker Build"
docker build . -t my-forum
