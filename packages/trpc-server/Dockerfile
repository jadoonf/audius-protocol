FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install --maxsockets 1

CMD npm run dev
