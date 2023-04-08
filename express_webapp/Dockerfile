FROM node:16

WORKDIR /sport
COPY . /sport

RUN npm install
ENV PATH /sport/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["npm", "start"]
