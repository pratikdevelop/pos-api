FROM node:alpine
# Create app directory
WORKDIR /app
COPY package*.json ./
RUN npm install  npm  
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "nodemon ", "start"]