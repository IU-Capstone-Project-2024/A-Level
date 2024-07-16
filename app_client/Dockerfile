FROM node:19.5.0-alpine

COPY ./app_client/package.json /app_client/package.json


COPY ./app_client /app_client
WORKDIR /app_client
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
