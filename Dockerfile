
FROM node:lts
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@9.0.1
# add app
COPY . /app
# start app
EXPOSE 4200
CMD ng serve --host 0.0.0.0