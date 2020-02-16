FROM node:10.19.0

ENV MONGO_URL='mongodb://localhost:27017/memometeor'
ENV ROOT_URL='http://memometeor.com:8080'
ENV PORT 8080
ENV METEOR_ALLOW_SUPERUSER=true

RUN npm install -g node-gyp \
       && apt-get update && apt-get install -y curl \
       && rm -rf /var/lib/apt/lists/

ADD docker-setup.sh ./
RUN chmod +x docker-setup.sh && ./docker-setup.sh


WORKDIR /app
CMD ["node", "main.js"]
