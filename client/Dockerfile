FROM node:16.15.0
WORKDIR /app/client
COPY package*.json ./
RUN npm install
COPY . ./
CMD [ "npm", "start" ]