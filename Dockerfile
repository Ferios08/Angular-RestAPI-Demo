FROM node 
WORKDIR /app
COPY . .
RUN npm install
RUN npm i @types/node
RUN npm install -g @angular/cli

ENV API=
ENV PORT=

EXPOSE 4200

CMD ng serve --host 0.0.0.0