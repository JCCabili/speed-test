FROM node:10.15.3
WORKDIR /app
COPY package.json /app
RUN npm install

COPY * /app/
RUN npm run build
RUN rm -rf *.js webpack.config.js
ENTRYPOINT ["npm", "start"]

# docker build -t jccabili/speed-test .
# docker push  jccabili/speed-test