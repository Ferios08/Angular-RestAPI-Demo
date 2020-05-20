FROM node 
WORKDIR /app
COPY . .
RUN npm install
RUN npm i @types/node
RUN npm install -g @angular/cli@9.0.1

ENV API=
ENV PORT=

EXPOSE 4200

CMD ng serve 