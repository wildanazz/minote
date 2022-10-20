FROM node:16.18-alpine AS builder
WORKDIR /client
COPY package.json yarn.lock README.md ./
RUN yarn
COPY ./public ./public
COPY ./src ./src
ENV REACT_APP_baseAPIURL=<backend-app-service-ip>:<port>
RUN yarn build

FROM nginx:latest
LABEL maintainer=Aamir-Pinger
COPY --from=builder /client/build/ /usr/share/nginx/html
EXPOSE 80
