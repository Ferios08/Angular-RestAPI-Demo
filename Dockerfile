# stage 1
FROM node as node
WORKDIR /app
COPY . .
RUN npm install
ENV API=
ENV PORT=

RUN npm run build


################################

# stage 2
FROM nginx
# client is the app name
COPY --from=node /app/dist/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
