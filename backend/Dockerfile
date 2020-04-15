FROM node:10-alpine
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN cd /app/frontend && yarn && yarn run build
CMD ["yarn", "start"]