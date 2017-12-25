FROM node:carbon
WORKDIR /usr/src/app/service
COPY bin ./bin
COPY config ./config
COPY src ./src
COPY webpack ./webpack
COPY .babelrc ./
COPY .eslintrc ./
COPY .npmrc ./
COPY .gitignore ./
COPY favicon.ico ./
COPY index.html ./
COPY server.js ./
COPY package.json ./
RUN npm install

EXPOSE 3500
CMD ["node", "bin/server.js"]