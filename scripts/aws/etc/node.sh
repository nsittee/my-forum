export MA_NODE_VERSION=12.19.0
export MA_NVM_VERSION=0.32.1
export NVM_DIR="$HOME/.nvm"

curl -o- https://raw.githubusercontent.com/creationix/nvm/v$MA_NVM_VERSION/install.sh | bash

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install NVM, NPM, Node.JS & Grunt
nvm alias default v$MA_NODE_VERSION
nvm install v$MA_NODE_VERSION
nvm use v$MA_NODE_VERSION
npm install pm2 -g

node -v
