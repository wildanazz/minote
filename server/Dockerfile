FROM node:16.18-alpine
WORKDIR /server
COPY package*.json yarn.lock ./
RUN yarn
COPY ./src ./src
EXPOSE 5000
CMD [ "yarn", "start" ]