# stage 1
FROM node as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

################################

# stage 2
FROM nginx
COPY --from=node /app/dist/client /usr/share/nginx/html