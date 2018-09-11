FROM node

ENV NODE_ENV=production

WORKDIR /usr/src

COPY package*.json ./

RUN npm i --production

### Add the plugins that you will use
# RUN npm i --no-save strigoaica-facebook
# RUN npm i --no-save strigoaica-gmail
# RUN npm i --no-save strigoaica-ses-template

WORKDIR /usr/src/app

CMD ["npm", "start"]
