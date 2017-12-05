FROM node
WORKDIR /app
COPY package.json .
ENV CI=true
RUN npm install
COPY . . 
RUN npm test
EXPOSE 3000
CMD ["npm", "start"]

