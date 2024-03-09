FROM node:18.17.1

WORKDIR /app/frontend

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
