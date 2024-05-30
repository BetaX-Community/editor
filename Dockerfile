FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
