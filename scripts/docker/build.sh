echo "################### Build Client: npm run build"
cd ./react-front-end
npm install
npm run build
cd ..

echo "################### Move /build into Server"
mv ./react-front-end/build ./express-back-end/
mv ./express-back-end/build/ ./express-back-end/public

echo "################### Docker Build"
docker build . -t my-forum
